package com.duyanhv.rnsimplifystarterkit;

import android.app.Application;
import android.util.Log;

import androidx.annotation.Nullable;

import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.codemotionapps.reactnativedarkmode.DarkModePackage;
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
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import com.facebook.react.PackageList;

public class MainApplication extends NavigationApplication implements ReactApplication {
    private final ReactNativeHost mReactNativeHost =
            new NavigationReactNativeHost(this) {
                @Override
                protected String getJSMainModuleName() {
                    return "index";
                }

                @Override
                public boolean getUseDeveloperSupport() {
                    return BuildConfig.DEBUG;
                }

                @Override
                public List<ReactPackage> getPackages() {
                    ArrayList<ReactPackage> packages = new PackageList(this).getPackages();
                    return packages;
                }
            };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

//    @Nullable
//    @Override
//    public List<ReactPackage> createAdditionalReactPackages() {
//        return Arrays.<ReactPackage>asList(
//                new SplashScreenReactPackage(),
//                new VectorIconsPackage(),
//                new AsyncStoragePackage(),
//                new ReactNativeExceptionHandlerPackage(),
//                new PickerViewPackage(),
//                new OrientationPackage(),
//                new LottiePackage(),
//                new CodePush("", MainApplication.this, BuildConfig.DEBUG),
//                new DarkModePackage(),
//                new RNNotificationsPackage(MainApplication.this),
//                new MapsPackage());
//    }
}
