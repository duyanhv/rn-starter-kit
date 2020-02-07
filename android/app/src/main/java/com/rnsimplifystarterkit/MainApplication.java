package com.rnsimplifystarterkit;

import android.app.Application;
import android.util.Log;

import com.codemotionapps.reactnativedarkmode.DarkModePackage;
import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.ReactApplication;
import com.airbnb.android.react.lottie.LottiePackage;
import com.microsoft.codepush.react.CodePush;
import com.github.yamill.orientation.OrientationPackage;
import com.beefe.picker.PickerViewPackage;
import com.masteratul.exceptionhandler.ReactNativeExceptionHandlerPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.oblador.vectoricons.VectorIconsPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;

import java.util.Arrays;
import java.util.List;
public class MainApplication extends NavigationApplication implements ReactApplication {

	@Override
	public boolean isDebug() {
		return BuildConfig.DEBUG;
	}

	@Override
	protected ReactGateway createReactGateway() {
		ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
			@javax.annotation.Nullable
			@Override
			protected String getJSBundleFile() {
				return CodePush.getJSBundleFile();
			}

			@Override
			protected String getJSMainModuleName() {
				return "index";
			}
		};
		return new ReactGateway(this, isDebug(), host);
	}

	@Override
	public List<ReactPackage> createAdditionalReactPackages() {
		return Arrays.<ReactPackage>asList(
				// eg. new VectorIconsPackage()
				new SplashScreenReactPackage(), new VectorIconsPackage(), new AsyncStoragePackage(),
				new ReactNativeExceptionHandlerPackage(),
				new PickerViewPackage(), new OrientationPackage(), new LottiePackage(),
				new CodePush("", MainApplication.this, BuildConfig.DEBUG), new DarkModePackage());
	}
}
