package com.reactfriendthem.modules;


import android.app.Activity;
import android.content.Intent;
import android.net.Uri;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

public class ImagePickerModule extends ReactContextBaseJavaModule {
    private static final int PICK_IMAGE = 1;

    private Callback pickerSuccessCallback;
    private Callback pickerCancelCallback;


    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
            if (pickerSuccessCallback != null) {
                if (resultCode == Activity.RESULT_CANCELED) {
                    pickerCancelCallback.invoke("ImagePicker was cancelled");
                } else if (resultCode == Activity.RESULT_OK) {
                    Uri uri = intent.getData();

                    if (uri == null) {
                        pickerCancelCallback.invoke("No image data found");
                    } else {
                        try {
                            pickerSuccessCallback.invoke(uri);
                        } catch (Exception e) {
                            pickerCancelCallback.invoke("No image data found");
                        }
                    }
                }
            }
        }
    };

    public ImagePickerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(mActivityEventListener);
    }

    @Override
    public String getName() {
        return "ImagePickerModule";
    }

    @ReactMethod
    public void pickImage(ReadableMap config, Callback successCallback, Callback cancelCallback) {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            cancelCallback.invoke("Activity doesn't exist");
            return;
        }

        pickerSuccessCallback = successCallback;
        pickerCancelCallback = cancelCallback;

        try {
            final Intent galleryIntent = new Intent(Intent.ACTION_PICK);

            galleryIntent.setType("image/*");

            final Intent chooserIntent = Intent.createChooser(galleryIntent, "Pick an image");

            currentActivity.startActivityForResult(chooserIntent, PICK_IMAGE);
        } catch (Exception e) {
            cancelCallback.invoke(e);
        }
    }
}
