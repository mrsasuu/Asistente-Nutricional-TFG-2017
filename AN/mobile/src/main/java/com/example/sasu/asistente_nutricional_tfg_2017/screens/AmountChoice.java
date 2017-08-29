package com.example.sasu.asistente_nutricional_tfg_2017.screens;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;

import com.example.sasu.asistente_nutricional_tfg_2017.R;
import com.example.sasu.asistente_nutricional_tfg_2017.models.Alimento;
import com.example.sasu.asistente_nutricional_tfg_2017.models.enumerados.HorarioComida;
import com.example.sasu.asistente_nutricional_tfg_2017.utilidades.ControllerPreferences;
import com.squareup.picasso.Picasso;

public class AmountChoice extends AppCompatActivity {

    ControllerPreferences controller = ControllerPreferences.getInstance();
    Alimento al;
    ImageView minFoto;
    ImageView medFoto;
    ImageView maxFoto;

    @Override
    protected void onCreate(Bundle savedInstanceState) {




        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_amount_choice);

        al = controller.getAl();

        minFoto = (ImageView) findViewById(R.id.porcionMin);
        medFoto = (ImageView) findViewById(R.id.porcionMed);
        maxFoto = (ImageView) findViewById(R.id.porcionMax);


        Picasso.with(getApplicationContext()).load(al.getMINPHOTO()).into(minFoto);
        Picasso.with(getApplicationContext()).load(al.getMEDPHOTO()).into(medFoto);
        Picasso.with(getApplicationContext()).load(al.getMAXPHOTO()).into(maxFoto);
    }

    public void cantidadMinima(View v){

        controller.registrarComidaFinal(al.getMINAMOUNT());
        mainScreen();
    }

    public void cantidadMedia(View v){

        controller.registrarComidaFinal(al.getMEDAMOUNT());
        mainScreen();
    }

    public void cantidadMaxima(View v){

        controller.registrarComidaFinal(al.getMAXAMOUNT());
        mainScreen();
    }

    public void mainScreen(){
        Intent intent = new Intent(this, Main_menu2.class);
        this.startActivity(intent);
    }
}
