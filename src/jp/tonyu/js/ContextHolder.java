package jp.tonyu.js;

import java.beans.PropertyChangeListener;
import java.io.IOException;
import java.io.Reader;
import java.util.Locale;

import org.mozilla.javascript.Callable;
import org.mozilla.javascript.ClassShutter;
import org.mozilla.javascript.Context;
import org.mozilla.javascript.ContextFactory;
import org.mozilla.javascript.ContinuationPending;
import org.mozilla.javascript.ErrorReporter;
import org.mozilla.javascript.Function;
import org.mozilla.javascript.GeneratedClassLoader;
import org.mozilla.javascript.Script;
import org.mozilla.javascript.Scriptable;
import org.mozilla.javascript.ScriptableObject;
import org.mozilla.javascript.SecurityController;
import org.mozilla.javascript.WrapFactory;
import org.mozilla.javascript.debug.Debugger;
import org.mozilla.javascript.xml.XMLLib.Factory;

public class ContextHolder {
	public Context get() {
		return ctx;
	}
	Context ctx;
	boolean hasToExit;
	public ContextHolder() {
		ctx=Context.getCurrentContext();
		hasToExit=(ctx==null);
		if (hasToExit) {
			ctx=Context.enter();
			onEnter(ctx);
		}
	}
	public void onEnter(Context c) {

	}
	public void release() {
		if (hasToExit) Context.exit();
	}
	public void addActivationName(String name) {
		ctx.addActivationName(name);
	}
	public final void addPropertyChangeListener(PropertyChangeListener l) {
		ctx.addPropertyChangeListener(l);
	}
	public Object callFunctionWithContinuations(Callable function,
			Scriptable scope, Object[] args) throws ContinuationPending {
		return ctx.callFunctionWithContinuations(function, scope, args);
	}
	public ContinuationPending captureContinuation() {
		return ctx.captureContinuation();
	}
	public final Function compileFunction(Scriptable scope, String source,
			String sourceName, int lineno, Object securityDomain) {
		return ctx.compileFunction(scope, source, sourceName, lineno,
				securityDomain);
	}
	public final Script compileReader(Reader in, String sourceName, int lineno,
			Object securityDomain) throws IOException {
		return ctx.compileReader(in, sourceName, lineno, securityDomain);
	}
	public final Script compileReader(Scriptable scope, Reader in,
			String sourceName, int lineno, Object securityDomain)
			throws IOException {
		return ctx.compileReader(scope, in, sourceName, lineno, securityDomain);
	}
	public final Script compileString(String source, String sourceName,
			int lineno, Object securityDomain) {
		return ctx.compileString(source, sourceName, lineno, securityDomain);
	}
	public GeneratedClassLoader createClassLoader(ClassLoader parent) {
		return ctx.createClassLoader(parent);
	}
	public final String decompileFunction(Function fun, int indent) {
		return ctx.decompileFunction(fun, indent);
	}
	public final String decompileFunctionBody(Function fun, int indent) {
		return ctx.decompileFunctionBody(fun, indent);
	}
	public final String decompileScript(Script script, int indent) {
		return ctx.decompileScript(script, indent);
	}
	public boolean equals(Object obj) {
		return ctx.equals(obj);
	}
	public final Object evaluateReader(Scriptable scope, Reader in,
			String sourceName, int lineno, Object securityDomain)
			throws IOException {
		return ctx
				.evaluateReader(scope, in, sourceName, lineno, securityDomain);
	}
	public final Object evaluateString(Scriptable scope, String source,
			String sourceName, int lineno, Object securityDomain) {
		return ctx.evaluateString(scope, source, sourceName, lineno,
				securityDomain);
	}
	public Object executeScriptWithContinuations(Script script, Scriptable scope)
			throws ContinuationPending {
		return ctx.executeScriptWithContinuations(script, scope);
	}
	public final ClassLoader getApplicationClassLoader() {
		return ctx.getApplicationClassLoader();
	}
	public final Debugger getDebugger() {
		return ctx.getDebugger();
	}
	public final Object getDebuggerContextData() {
		return ctx.getDebuggerContextData();
	}
	public Factory getE4xImplementationFactory() {
		return ctx.getE4xImplementationFactory();
	}
	public final Object[] getElements(Scriptable object) {
		return ctx.getElements(object);
	}
	public final ErrorReporter getErrorReporter() {
		return ctx.getErrorReporter();
	}
	public final ContextFactory getFactory() {
		return ctx.getFactory();
	}
	public final String getImplementationVersion() {
		return ctx.getImplementationVersion();
	}
	public final int getInstructionObserverThreshold() {
		return ctx.getInstructionObserverThreshold();
	}
	public final int getLanguageVersion() {
		return ctx.getLanguageVersion();
	}
	public final Locale getLocale() {
		return ctx.getLocale();
	}
	public final int getMaximumInterpreterStackDepth() {
		return ctx.getMaximumInterpreterStackDepth();
	}
	public final int getOptimizationLevel() {
		return ctx.getOptimizationLevel();
	}
	public final Object getThreadLocal(Object key) {
		return ctx.getThreadLocal(key);
	}
	public final WrapFactory getWrapFactory() {
		return ctx.getWrapFactory();
	}
	public final boolean hasCompileFunctionsWithDynamicScope() {
		return ctx.hasCompileFunctionsWithDynamicScope();
	}
	public boolean hasFeature(int featureIndex) {
		return ctx.hasFeature(featureIndex);
	}
	public int hashCode() {
		return ctx.hashCode();
	}
	public final ScriptableObject initStandardObjects() {
		return ctx.initStandardObjects();
	}
	public ScriptableObject initStandardObjects(ScriptableObject scope,
			boolean sealed) {
		return ctx.initStandardObjects(scope, sealed);
	}
	public final Scriptable initStandardObjects(ScriptableObject scope) {
		return ctx.initStandardObjects(scope);
	}
	public final boolean isActivationNeeded(String name) {
		return ctx.isActivationNeeded(name);
	}
	public final boolean isGeneratingDebug() {
		return ctx.isGeneratingDebug();
	}
	public final boolean isGeneratingDebugChanged() {
		return ctx.isGeneratingDebugChanged();
	}
	public final boolean isGeneratingSource() {
		return ctx.isGeneratingSource();
	}
	public final boolean isSealed() {
		return ctx.isSealed();
	}
	public final Scriptable newArray(Scriptable scope, int length) {
		return ctx.newArray(scope, length);
	}
	public final Scriptable newArray(Scriptable scope, Object[] elements) {
		return ctx.newArray(scope, elements);
	}
	public final Scriptable newObject(Scriptable scope, String constructorName,
			Object[] args) {
		return ctx.newObject(scope, constructorName, args);
	}
	public final Scriptable newObject(Scriptable scope, String constructorName) {
		return ctx.newObject(scope, constructorName);
	}
	public final Scriptable newObject(Scriptable scope) {
		return ctx.newObject(scope);
	}
	public final void putThreadLocal(Object key, Object value) {
		ctx.putThreadLocal(key, value);
	}
	public void removeActivationName(String name) {
		ctx.removeActivationName(name);
	}
	public final void removePropertyChangeListener(PropertyChangeListener l) {
		ctx.removePropertyChangeListener(l);
	}
	public final void removeThreadLocal(Object key) {
		ctx.removeThreadLocal(key);
	}
	public Object resumeContinuation(Object continuation, Scriptable scope,
			Object functionResult) throws ContinuationPending {
		return ctx.resumeContinuation(continuation, scope, functionResult);
	}
	public final void seal(Object sealKey) {
		ctx.seal(sealKey);
	}
	public final void setApplicationClassLoader(ClassLoader loader) {
		ctx.setApplicationClassLoader(loader);
	}
	public final void setClassShutter(ClassShutter shutter) {
		ctx.setClassShutter(shutter);
	}
	public final void setCompileFunctionsWithDynamicScope(boolean flag) {
		ctx.setCompileFunctionsWithDynamicScope(flag);
	}
	public final void setDebugger(Debugger debugger, Object contextData) {
		ctx.setDebugger(debugger, contextData);
	}
	public final ErrorReporter setErrorReporter(ErrorReporter reporter) {
		return ctx.setErrorReporter(reporter);
	}
	public void setGenerateObserverCount(boolean generateObserverCount) {
		ctx.setGenerateObserverCount(generateObserverCount);
	}
	public final void setGeneratingDebug(boolean generatingDebug) {
		ctx.setGeneratingDebug(generatingDebug);
	}
	public final void setGeneratingSource(boolean generatingSource) {
		ctx.setGeneratingSource(generatingSource);
	}
	public final void setInstructionObserverThreshold(int threshold) {
		ctx.setInstructionObserverThreshold(threshold);
	}
	public void setLanguageVersion(int version) {
		ctx.setLanguageVersion(version);
	}
	public final Locale setLocale(Locale loc) {
		return ctx.setLocale(loc);
	}
	public final void setMaximumInterpreterStackDepth(int max) {
		ctx.setMaximumInterpreterStackDepth(max);
	}
	public final void setOptimizationLevel(int optimizationLevel) {
		ctx.setOptimizationLevel(optimizationLevel);
	}
	public final void setSecurityController(SecurityController controller) {
		ctx.setSecurityController(controller);
	}
	public final void setWrapFactory(WrapFactory wrapFactory) {
		ctx.setWrapFactory(wrapFactory);
	}
	public final boolean stringIsCompilableUnit(String source) {
		return ctx.stringIsCompilableUnit(source);
	}
	public final void unseal(Object sealKey) {
		ctx.unseal(sealKey);
	}
}
