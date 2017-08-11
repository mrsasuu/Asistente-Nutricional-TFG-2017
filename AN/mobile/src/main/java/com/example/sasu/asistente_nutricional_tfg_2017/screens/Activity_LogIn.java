package com.example.sasu.asistente_nutricional_tfg_2017.screens;

import android.content.DialogInterface;
import android.net.Uri;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.Toast;

import com.example.sasu.asistente_nutricional_tfg_2017.Fragments.LoginFragment;
import com.example.sasu.asistente_nutricional_tfg_2017.Fragments.Loging_Loading;
import com.example.sasu.asistente_nutricional_tfg_2017.Fragments.RegistrationFragment;
import com.example.sasu.asistente_nutricional_tfg_2017.R;

public class Activity_LogIn extends AppCompatActivity implements LoginFragment.OnFragmentInteractionListener,Loging_Loading.OnFragmentInteractionListener, RegistrationFragment.OnFragmentInteractionListener {

    LinearLayout input_user_layout;
    LinearLayout input_password_layout;
    EditText input_user;
    EditText input_password;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_log_in);
/*
        input_user_layout = (LinearLayout) findViewById(R.id.input_user_layout);
        input_user = (EditText) findViewById(R.id.input_user);

        input_user.setOnFocusChangeListener(new View.OnFocusChangeListener() {
            @Override
            public void onFocusChange(View v, boolean hasFocus) {
                if(hasFocus){
                    input_user_layout.setBackgroundResource(R.drawable.borderr);
                }else {
                    input_user_layout.setBackgroundResource(R.drawable.no_border);
                }
            }
        });

        input_password_layout = (LinearLayout) findViewById(R.id.input_password_layout);
        input_password = (EditText) findViewById(R.id.input_password);

        input_password.setOnFocusChangeListener(new View.OnFocusChangeListener() {
            @Override
            public void onFocusChange(View v, boolean hasFocus) {
                if(hasFocus){
                    input_password_layout.setBackgroundResource(R.drawable.borderr);
                }else {
                    input_password_layout.setBackgroundResource(R.drawable.no_border);
                }
            }
        });*/

        LoginFragment loginFragment = new LoginFragment();
        FragmentManager fragmentManager = getSupportFragmentManager();
        FragmentTransaction transaction = fragmentManager.beginTransaction();
        //transaction.setCustomAnimations(R.anim.slide_in_left,R.anim.slide_out_left);
        transaction.setCustomAnimations(R.anim.slide_in_left,R.anim.slide_out_left, R.anim.slide_in_left, R.anim.slide_out_left );
        transaction.add(R.id.activity_Main_Login,loginFragment);
        //transaction.addToBackStack(transaction.toString());
        transaction.commit();


    }

    @Override
    public void onBackPressed() {
        FragmentManager fragmentManager = getSupportFragmentManager();
        //Toast.makeText(this,Integer.toString(fragmentManager.getBackStackEntryCount()),Toast.LENGTH_LONG).show();
        if(fragmentManager.getBackStackEntryCount()<1)
        {
            new AlertDialog.Builder(this).setMessage(R.string.exit_Message)
                    .setCancelable(false)
                    .setPositiveButton(R.string.Yes, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int id) {
                            finish();
                            System.exit(0);

                        }
                    })
                    .setNegativeButton(R.string.No, null)
                    .show();
        }else{
            super.onBackPressed();
        }


    }

    @Override
    public void onFragmentInteraction(Uri uri) {

    }
}
