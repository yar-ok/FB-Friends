package com.reactfriendthem.modules.managers;


import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.reactfriendthem.modules.ImagePickerModule;
import com.reactfriendthem.modules.ToastModule;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ReackModulePackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new ToastModule(reactContext));
        modules.add(new ImagePickerModule(reactContext));
        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
