package com.example.sasu.asistente_nutricional_tfg_2017.prefs;

import android.content.Context;
import android.content.SharedPreferences;
import android.text.TextUtils;

import com.example.sasu.asistente_nutricional_tfg_2017.models.Patient;


/**
 * Manejador de preferencias de la sesión del paciente
 */
public class SessionPrefs {

    public static final String PREFS_NAME = "AN_PREFS";
    public static final String PREF_PATIENT_ID = "PREF_USER_ID";
    public static final String PREF_PATIENT_NAME = "PREF_PATIENT_NAME";
    public static final String PREF_PATIENT_SURNAME = "PREF_PATIENT_SURNAME";
    public static final String PREF_PATIENT_USERNAME = "PREF_PATIENT_USERNAME";
    public static final String PREF_PATIENT_NUTRITIONIST_ID = "PREF_PATIENT_NUTRITIONIST_ID";
    public static final String PREF_PATIENT_NEWS = "PREF_PATIENT_NEWS";
    public static final String PREF_PATIENT_TOKEN = "PREF_PATIENT_TOKEN";

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

        mIsLoggedIn = !TextUtils.isEmpty(mPrefs.getString(PREF_PATIENT_TOKEN, null));
    }

    public String getToken(){
        return mPrefs.getString(PREF_PATIENT_TOKEN, null);
    }

    public boolean isLoggedIn() {
        return mIsLoggedIn;
    }

    public void savePatient(Patient patient) {
        if (patient != null) {
            SharedPreferences.Editor editor = mPrefs.edit();
            editor.putString(PREF_PATIENT_ID,  Integer.toString(patient.getID()));
            editor.putString(PREF_PATIENT_NAME, patient.getNAME());
            editor.putString(PREF_PATIENT_USERNAME, patient.getUSERNAME());
            editor.putString(PREF_PATIENT_SURNAME, patient.getSURNAME());
            editor.putString(PREF_PATIENT_NUTRITIONIST_ID, Integer.toString(patient.getNUTRITIONIST_ID()));
            editor.putString(PREF_PATIENT_NEWS,  Integer.toString(patient.getNEWS()));
            editor.putString(PREF_PATIENT_TOKEN, patient.getTOKEN());
            editor.apply();

            mIsLoggedIn = true;

            System.out.println("true");
        }
    }

    public void logOut(){
        mIsLoggedIn = false;
        SharedPreferences.Editor editor = mPrefs.edit();
        editor.putString(PREF_PATIENT_ID, null);
        editor.putString(PREF_PATIENT_NAME, null);
        editor.putString(PREF_PATIENT_USERNAME, null);
        editor.putString(PREF_PATIENT_SURNAME, null);
        editor.putString(PREF_PATIENT_NUTRITIONIST_ID, null);
        editor.putString(PREF_PATIENT_NEWS, null);
        editor.putString(PREF_PATIENT_TOKEN, null);

        editor.apply();
    }
}
