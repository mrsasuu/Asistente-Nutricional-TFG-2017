package com.example.sasu.asistente_nutricional_tfg_2017.screens;

/**
 * Created by Sasu on 22/02/2017.
 */

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.view.Window;

import com.example.sasu.asistente_nutricional_tfg_2017.R;
import com.example.sasu.asistente_nutricional_tfg_2017.prefs.SessionPrefs;

import java.util.Timer;
import java.util.TimerTask;


public class ActivitySplashScreen extends Activity {
    Context context;
/*
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        context = this;
        // Set portrait orientation
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        // Hide title bar
        requestWindowFeature(Window.FEATURE_NO_TITLE);

        setContentView(R.layout.activity_splash_screen);

       // ControllerPreferences preferences= ControllerPreferences.getInstance();

        //preferences.loadPreferences(this);


      /*  if(preferences.isFirtsTime()) {
            new Handler().postDelayed(new Runnable() {
                @Override
                public void run() {
                    Intent intent = new Intent(ActivitySplashScreen.this, ActivityLang.class);
                    intent.putExtra("FirstTime","True");
                    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                    startActivity(intent);
                }
            }, 3000);
        }
        else
        {*/
           /* new Handler().postDelayed(new Runnable() {
                @Override
                public void run() {

                   //Languages.setLocale(ControllerPreferences.getLanguage(),context);

                    Intent intent = new Intent(ActivitySplashScreen.this, Activity_LogIn.class);
                    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                    startActivity(intent);
                }
            }, 3000);
        //}
    }*/

    // Set the duration of the splash screen
    private static final long SPLASH_SCREEN_DELAY = 3000;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        context = this.getApplicationContext();
        // Set portrait orientation
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        // Hide title bar
        requestWindowFeature(Window.FEATURE_NO_TITLE);

        setContentView(R.layout.activity_splash_screen);

        TimerTask task = new TimerTask() {
            @Override
            public void run() {

                // Start the next activity

                // Redirección al Login
                if (!SessionPrefs.get(context).isLoggedIn()) {
                    //startActivity(new Intent(context, LoginActivity.class));
                    startActivity(new Intent(context, Main_menu2.class));
                    finish();
                    return;
                }else {
                    Intent mainIntent = new Intent().setClass(
                            //ActivitySplashScreen.this, LoginActivity.class);
                            ActivitySplashScreen.this, Main_menu2.class);
                    startActivity(mainIntent);
                }

                // Close the activity so the user won't able to go back this
                // activity pressing Back button
                finish();
            }
        };

        // Simulate a long loading process on application startup.
        Timer timer = new Timer();
        timer.schedule(task, SPLASH_SCREEN_DELAY);
    }

}

