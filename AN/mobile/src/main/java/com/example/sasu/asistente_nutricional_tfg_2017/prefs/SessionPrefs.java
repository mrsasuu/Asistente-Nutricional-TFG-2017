package com.example.sasu.asistente_nutricional_tfg_2017.prefs;

import android.content.Context;
import android.content.SharedPreferences;
import android.text.TextUtils;

import com.example.sasu.asistente_nutricional_tfg_2017.models.Patient;


/**
 * Manejador de preferencias de la sesión del paciente
 */
public class SessionPrefs {

    public static final String PREFS_NAME = "SALUDMOCK_PREFS";
    public static final String PREF_AFFILIATE_ID = "PREF_USER_ID";
    public static final String PREF_AFFILIATE_NAME = "PREF_AFFILIATE_NAME";
    public static final String PREF_AFFILIATE_ADDRESS = "PREF_AFFILIATE_ADDRESS";
    public static final String PREF_AFFILIATE_GENDER = "PREF_AFFILIATE_GENDER";
    public static final String PREF_AFFILAITE_TOKEN = "PREF_AFFILAITE_TOKEN";

    private final SharedPreferences mPrefs;

    private boolean mIsLoggedIn = false;

    private static SessionPrefs INSTANCE;

    public static SessionPrefs get(Context context) {
        if (INSTANCE == null) {
            INSTANCE = new SessionPrefs(context);
        }
        return INSTANCE;
    }

    private SessionPrefs(Context context) {
        mPrefs = context.getApplicationContext()
                .getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);

        mIsLoggedIn = !TextUtils.isEmpty(mPrefs.getString(PREF_AFFILAITE_TOKEN, null));
    }

    public boolean isLoggedIn() {
        return mIsLoggedIn;
    }

    public void saveAffiliate(Patient affiliate) {
        if (affiliate != null) {
            SharedPreferences.Editor editor = mPrefs.edit();
            editor.putString(PREF_AFFILIATE_ID, affiliate.getId());
            editor.putString(PREF_AFFILIATE_NAME, affiliate.getName());
            editor.putString(PREF_AFFILIATE_ADDRESS, affiliate.getAddress());
            editor.putString(PREF_AFFILIATE_GENDER, affiliate.getGender());
            editor.putString(PREF_AFFILAITE_TOKEN, affiliate.getToken());
            editor.apply();

            mIsLoggedIn = true;

            System.out.println("true");
        }
    }

    public void logOut(){
        mIsLoggedIn = false;
        SharedPreferences.Editor editor = mPrefs.edit();
        editor.putString(PREF_AFFILIATE_ID, null);
        editor.putString(PREF_AFFILIATE_NAME, null);
        editor.putString(PREF_AFFILIATE_ADDRESS, null);
        editor.putString(PREF_AFFILIATE_GENDER, null);
        editor.putString(PREF_AFFILAITE_TOKEN, null);
        editor.apply();
    }
}
