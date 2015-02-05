package jp.tonyu.cartridges;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Vector;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jp.tonyu.auth.Auth;
import jp.tonyu.auth.RequestSigner;
import jp.tonyu.blob.BlobStore;
import jp.tonyu.servlet.ServerInfo;
import jp.tonyu.servlet.ServletCartridge;
import jp.tonyu.util.HTMLDecoder;
import jp.tonyu.util.Streams;
import net.arnx.jsonic.JSON;

import com.google.appengine.api.blobstore.BlobInfo;
import com.google.appengine.api.blobstore.BlobInfoFactory;
import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreInputStream;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.appengine.api.datastore.DatastoreService;

public class BlobCartridge implements ServletCartridge {
    private static final String BLOB_URL = "blobURL";
    BlobstoreService bs=BlobstoreServiceFactory.getBlobstoreService();
    //DatastoreService dss;
    BlobStore bst;
    Auth auth;
    boolean readFree;
    RequestSigner sgn;
    BlobInfoFactory bif;
    public BlobCartridge(Auth a,DatastoreService dss, RequestSigner sgn, boolean readFree) {
        bst=new BlobStore(bs, dss);
        this.auth=a;
        bif=new BlobInfoFactory(dss);
        this.readFree=readFree;
        this.sgn=sgn;
    }
    @Override
    public boolean get(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {
        // TODO 自動生成されたメソッド・スタブ
        String u=req.getPathInfo();
        if (u.startsWith("/"+BLOB_URL)) {
            resp.getWriter().print(bs.createUploadUrl(
                    (ServerInfo.isExe(req)? "/exe":"/edit")+ "/blobUploadDone"));
            return true;
        }
        String sb = "/serveBlob/";
        if (u.startsWith(sb)) {
            String path=u.substring(sb.length());
            return serveBlob(resp, path);
        }
        if (u.startsWith("/deleteBlob/")) {
            return deleteBlob(req, resp);
        }
        if (u.startsWith("/retainBlobs")) {
            return retainBlobs(req, resp);
        }
        if (u.startsWith("/uploadBlobToExe")) {
            return uploadBlobToExe(req,resp);
        }
        if (u.startsWith("/scanBlobMD5s")) {
            bst.scanAll();
            resp.getWriter().print("OK");
            return true;
        }
        if (u.startsWith("/blobMD5sOfProject")) {
            String user=req.getParameter("user");
            String project=req.getParameter("project");
            Map<String, String> res = bst.md5sOfProject(user,project);
            resp.getWriter().print(JSON.encode(res));
            return true;
        }
        if (u.startsWith("/forkBlobs")) {
            return forkBlobs(req,resp);
        }
        return false;
    }
    private boolean forkBlobs(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        if (ServerInfo.isExe(req)) return false;
        String dstUser=auth.currentUserId();
        if (dstUser==null) {
            resp.getWriter().print("LoginRequired");
            return true;
        }
        String srcUser=req.getParameter("srcUser");
        String srcProject=req.getParameter("srcProject");
        String dstProject=req.getParameter("dstProject");
        String urlString=ServerInfo.exeURL(req)+"/exe/blobMD5sOfProject"+
        "?user="+HTMLDecoder.encode(srcUser)+
        "&project="+HTMLDecoder.encode(srcProject)
        ;
        URL url = new URL(urlString);
        URLConnection uc = url.openConnection();
        InputStream in = uc.getInputStream();
        String buf=Streams.stream2str(in);
        Map md5s = (Map)JSON.decode(buf);
        bst.forkBlob(md5s, dstUser, dstProject);
        resp.getWriter().print("Forked");
        return true;
    }
    @Override
    public boolean post(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {
        String u=req.getPathInfo();
        if (u.startsWith("/blobUploadDone")) {
            return blobUploadDone(req, resp);
        }
        return false;
    }
    public boolean blobUploadDone(HttpServletRequest req,
            HttpServletResponse resp) throws IOException {
        String user=req.getParameter(BlobStore.KEY_USER);
        String project=req.getParameter(BlobStore.KEY_PRJ);
        String fileName=req.getParameter(BlobStore.KEY_FN);
        String chk=req.getParameter(UploadClient.PARAM_CHK);
        System.out.println("Receiving blob "+user+"/"+project+"/"+fileName);

        if (user==null || project==null || fileName==null) {
            resp.setStatus(500);
            resp.getWriter().print("user ("+user+") project ("+project+") fileName ("+fileName+") is not specified");
            return true;
        }

        Map<String, List<BlobKey>> keys = bs.getUploads(req);
        //List<String> keyStrList=new Vector<String>();
        BlobKey found=null;
        for (String name:keys.keySet()) {
            List<BlobKey> bks = keys.get(name);
            System.out.println(name+": ");
            for (BlobKey bk:bks) {
                found=bk;
                System.out.println("blobkey="+bk.getKeyString());
                //keyStrList.add(bk.getKeyString());
            }
        }
        if (chk!=null) {
            BlobInfo binfo = bif.loadBlobInfo(found);
            String hash = binfo.getMd5Hash();
            System.out.println("Chk="+chk+"  hash="+hash+"  sum(user+hash)="+ sgn.sum(user+hash));
            if (chk.equals( sgn.sum(user+hash) ) ){
                auth.su(user);
            }
        }
        if (!user.equals(auth.currentUserId())) {
            resp.setStatus(500);
            resp.getWriter().print("upload permission denied");
            return true;
        }
        bst.putKey(user, project, fileName, found);
        //System.out.println(req.getParameter("test"));
        resp.getWriter().print("Added");
        System.out.println("Done Receiving blob "+user+"/"+project+"/"+fileName);
        return true;
    }
    public boolean serveBlob(HttpServletResponse resp, String path)
            throws IOException {
        String []paths=path.split("/");
        String user=paths[0];
        String project=paths[1];
        String fileName=paths[2];
        if (user==null || project==null || fileName==null) {
            resp.setStatus(500);
            resp.getWriter().print("user project fileName is not specified");
            return true;
        }
        if (!user.equals(auth.currentUserId()) && !readFree) {
            resp.setStatus(500);
            resp.getWriter().print("read permission denied");
            return true;
        }
        String ct= detectContentType(fileName);
        resp.setContentType(ct);
        //String bk=req.getParameter("key");
        BlobKey blobKey = bst.getKey(user, project, fileName);//  new BlobKey(bk);
        BlobstoreInputStream in = new BlobstoreInputStream(blobKey);
        ServletOutputStream out = resp.getOutputStream();
        Streams.redirect(in, out);
        in.close();
        out.close();
        return true;
    }
    public boolean deleteBlob(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {
        auth.validateCsrfToken(req);
        String user=req.getParameter(BlobStore.KEY_USER);
        String project=req.getParameter(BlobStore.KEY_PRJ);
        String fileName=req.getParameter(BlobStore.KEY_FN);
        if (user==null || project==null || fileName==null) {
            resp.setStatus(500);
            resp.getWriter().print("user project fileName is not specified");
            return true;
        }
        if (!user.equals(auth.currentUserId())) {
            resp.setStatus(500);
            resp.getWriter().print("delete permission denied");
            return true;
        }
        bst.delete(user, project, fileName);
        resp.getWriter().print("Deleted");
        return true;
    }
    public boolean retainBlobs(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {
        auth.validateCsrfToken(req);
        String user=req.getParameter(BlobStore.KEY_USER);
        String project=req.getParameter(BlobStore.KEY_PRJ);
        String retainFileNames=req.getParameter("retainFileNames");
        String mediaType=req.getParameter("mediaType");
        if (user==null || project==null || retainFileNames==null) {
            resp.setStatus(500);
            resp.getWriter().print("user project retainFileNames are not specified");
            return true;
        }
        System.out.println("RetainFileNames : "+retainFileNames);
        List rtfl=JSON.decode(retainFileNames);
        Set rtf=new HashSet(rtfl);
        bst.retain(user,project,rtf,mediaType);
        resp.getWriter().print("Cleaned");
        return true;
    }
    private boolean uploadBlobToExe(HttpServletRequest req,
            HttpServletResponse resp) throws IOException{
        auth.validateCsrfToken(req);

        //String user=req.getParameter(BlobStore.KEY_USER);
        String user=auth.currentUserId();
        String project=req.getParameter(BlobStore.KEY_PRJ);
        String fileName=req.getParameter(BlobStore.KEY_FN);
        System.out.print("Upload blob "+project+"/"+fileName+"...");
        String burls = UploadClient.getExeServerURL(req, BLOB_URL);
        BlobKey blobKey = bst.getKey(user, project, fileName);
        if (blobKey==null) {
            //resp.setStatus(404);
            String erm = "Not found : "+user+"/"+project+"/"+fileName;
            resp.getWriter().print(erm);
            return true;
        }
        URL burl=new URL(burls);
        URLConnection ucon = burl.openConnection();
        InputStream uis = ucon.getInputStream();
        String bupURL = Streams.stream2str(uis);

        //FileService fileService = FileServiceFactory.getFileService();
        //AppEngineFile binaryFile = fileService.getBlobFile(new BlobKey("my blob key"));

        /*String param = BlobStore.KEY_USER+"=" + URLEncoder.encode(user, "UTF-8") +
                "&"+BlobStore.KEY_PRJ+"=" + URLEncoder.encode(project, "UTF-8")+
                "&"+BlobStore.KEY_FN+"=" + URLEncoder.encode(fileName, "UTF-8")+
                "&"+UploadClient.PARAM_CHK+"=" + URLEncoder.encode(UploadClient.sum(user), "UTF-8");*/
        String charset = "UTF-8";

        String boundary = Long.toHexString(System.currentTimeMillis()); // Just generate some unique random value.
        String CRLF = "\r\n"; // Line separator required by multipart/form-data.

        URLConnection connection = new URL(bupURL).openConnection();
        connection.setDoOutput(true);
        connection.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);
        PrintWriter writer = null;
        OutputStream output = connection.getOutputStream();
        writer = new PrintWriter(new OutputStreamWriter(output, charset), true); // true = autoFlush, important!

        // Send normal user.
        writer.append("--" + boundary).append(CRLF);
        writer.append("Content-Disposition: form-data; name=\""+BlobStore.KEY_USER+"\"").append(CRLF);
        writer.append("Content-Type: text/plain; charset=" + charset).append(CRLF);
        writer.append(CRLF);
        writer.append(user).append(CRLF).flush();

        // Send normal prj.
        writer.append("--" + boundary).append(CRLF);
        writer.append("Content-Disposition: form-data; name=\""+BlobStore.KEY_PRJ+"\"").append(CRLF);
        writer.append("Content-Type: text/plain; charset=" + charset).append(CRLF);
        writer.append(CRLF);
        writer.append(project).append(CRLF).flush();

        // Send normal fn.
        writer.append("--" + boundary).append(CRLF);
        writer.append("Content-Disposition: form-data; name=\""+BlobStore.KEY_FN+"\"").append(CRLF);
        writer.append("Content-Type: text/plain; charset=" + charset).append(CRLF);
        writer.append(CRLF);
        writer.append(fileName).append(CRLF).flush();

        // Send normal chk.
        BlobInfo binfo = bif.loadBlobInfo(blobKey);
        String hash=binfo.getMd5Hash();
        writer.append("--" + boundary).append(CRLF);
        writer.append("Content-Disposition: form-data; name=\""+UploadClient.PARAM_CHK+"\"").append(CRLF);
        writer.append("Content-Type: text/plain; charset=" + charset).append(CRLF);
        writer.append(CRLF);
        writer.append(sgn.sum(user+hash)).append(CRLF).flush();


        // Send binary file.
        writer.append("--" + boundary).append(CRLF);
        writer.append("Content-Disposition: form-data; name=\"binaryFile\"; filename=\"" + fileName + "\"").append(CRLF);
        writer.append("Content-Type: " + URLConnection.guessContentTypeFromName(fileName)).append(CRLF);
        writer.append("Content-Transfer-Encoding: binary").append(CRLF);
        writer.append(CRLF).flush();
        InputStream input = null;
        try {
            input=new BlobstoreInputStream(blobKey);
            Streams.redirect(input, output);
            output.flush(); // Important! Output cannot be closed. Close of writer will close output as well.
        } finally {
            if (input != null) try { input.close(); } catch (IOException logOrIgnore) {}
        }
        writer.append(CRLF).flush(); // CRLF is important! It indicates end of binary boundary.

        // End of multipart/form-data.
        writer.append("--" + boundary+"--").append(CRLF).flush();


        InputStream ri = connection.getInputStream(); //resEntity.getContent();
        Streams.redirect(ri, resp.getOutputStream());
        System.out.println("done");
        return true;
    }
    public String detectContentType(String fileName) {
        String ct = "Application/Octet-Stream";
        if (fileName.endsWith(".png")) {
            ct="image/png";
        }
        if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
            ct="image/jpeg";
        }
        if (fileName.endsWith(".gif")) {
            ct="image/gif";
        }
        if (fileName.endsWith(".mp3")) {
            ct="audio/mp3";
        }
        if (fileName.endsWith(".ogg")) {
            ct="audio/ogg";
        }
        return ct;
    }

}
