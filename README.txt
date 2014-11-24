tonyuedit ver 0.1

http://tonyuedit.appspot.com/
Tonyu 2 development environment server

= How to host tonyuedit as your own GAE app

== Configure ServerInfo

Open jp.tonyu.servlet.ServerInfo and modify urls for your app

== Set the root password

open http://your_tonyuedit.appspot.com/

Open js console and type

$.post("/edit/passwd",{user:"root","new":"the_root_password"});

Notice: Once the root password is set, you should login as root to change the password.
        To reset password, open your GAE console and delete the "User" datastore entity where userID='root'

== Set the OAuth tokens

Log in as root:
-open http://your_tonyuedit.appspot.com/edit/login/
-Click the element "ログイン(Login)" and input form appears.
-input root and your root password

Type on js console:

$.post("/edit/oauthKey",{service:"google",
key:"your_google_oauth_key",
secret:"your_google_oauth_secret"
});

$.post("/edit/oauthKey",{service:"twitter",
key:"your_twitter_oauth_key",
secret:"your_twitter_oauth_secret"
});

== Set the tonyuedit-tonyuexe communication token

communication token is needed in order to upload projects on tonyuedit to tonyuexe
or obtain project information of tonyuexe from tonyuedit.

- Decide some random string as the_token
- Log in as root and type on js console:

$.post("/edit/oauthKey",{service:"tonyu_comm",
key:"tonyu",
secret:"the_token"
});

NOTICE: you have to set the same token also in your tonyuexe app.

== License

tonyuedit is licensed under Apache License, Version 2.0 .




