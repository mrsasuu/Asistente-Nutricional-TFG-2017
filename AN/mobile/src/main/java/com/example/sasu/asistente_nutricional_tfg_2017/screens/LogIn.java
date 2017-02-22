package com.example.sasu.asistente_nutricional_tfg_2017.screens;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.Toast;

import com.example.sasu.asistente_nutricional_tfg_2017.R;

public class LogIn extends AppCompatActivity {

    LinearLayout input_user_layout;
    LinearLayout input_password_layout;
    EditText input_user;
    EditText input_password;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_log_in);

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
        });
    }
}
