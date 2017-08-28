package com.example.sasu.asistente_nutricional_tfg_2017.adapters;

import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.sasu.asistente_nutricional_tfg_2017.R;
import com.example.sasu.asistente_nutricional_tfg_2017.models.Alimento;
import com.example.sasu.asistente_nutricional_tfg_2017.models.Objetivo;
import com.example.sasu.asistente_nutricional_tfg_2017.screens.Main_menu2;
import com.example.sasu.asistente_nutricional_tfg_2017.utilidades.ControllerPreferences;
import com.squareup.picasso.Picasso;
import com.squareup.picasso.Target;

import java.util.List;

/**
 * Created by mrsas on 08/06/2017.
 */

public class AdapterObjetivo extends RecyclerView.Adapter<AdapterObjetivo.RegistroViewHolder> {

    List<Objetivo> listaObjetivos;
    private Context context;

    public static class RegistroViewHolder extends RecyclerView.ViewHolder {//implements View.OnClickListener{

        public CardView cardviewAlimento;
        public TextView nombre;
        //public ImageView foto;
        Context context;
        ControllerPreferences controller = ControllerPreferences.getInstance();

        Objetivo objetivo;

        public RegistroViewHolder(View itemView) {
            super(itemView);

            context = itemView.getContext();

            cardviewAlimento = (CardView) itemView.findViewById(R.id.cardViewObjetivo);
            nombre = (TextView) itemView.findViewById(R.id.nombreObjetivo);
            //foto = (ImageView) itemView.findViewById(R.id.fotoAlimento);

            //itemView.setOnClickListener(this);

        }
/*
        public void onClick(View view) {
            controller.registrarComidaHorario(alimento);

            Log.println(Log.INFO,"Nombre",alimento.getNAME());

            Intent intent = new Intent(context, Main_menu2.class);
            context.startActivity(intent);

        }*/
    }

    public AdapterObjetivo(List<Objetivo> listaObjetivos, Context context) {
        this.listaObjetivos = listaObjetivos;
        this.context = context;
    }

    @Override
    public RegistroViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.row_item_objetivo, parent, false);
        RegistroViewHolder holder = new RegistroViewHolder(v);
        return holder;
    }


    @Override
    public void onBindViewHolder(final RegistroViewHolder holder, int position) {
        holder.objetivo = listaObjetivos.get(position);
        //Picasso.with(context).load(listaAlimentos.get(position).getPHOTO()).into(holder.foto);
        Picasso.with(context).load(listaObjetivos.get(position).getPHOTO()).into(new Target() {
            @Override
            public void onBitmapLoaded(Bitmap bitmap, Picasso.LoadedFrom from) {
                holder.cardviewAlimento.setBackground(new BitmapDrawable(context.getResources(), bitmap));
            }

            @Override
            public void onBitmapFailed(Drawable errorDrawable) {

            }

            @Override
            public void onPrepareLoad(Drawable placeHolderDrawable) {

            }
        });


        //holder.cardviewAlimento.setBackgroundResource(R.drawable.sunny);
        holder.nombre.setText("Tomar "+ (listaObjetivos.get(position).getAMOUNT() - listaObjetivos.get(position).getPROGRESS()) + " porcion/es de " +listaObjetivos.get(position).getFOODNAME());
    }


    @Override
    public int getItemCount() {

        return listaObjetivos.size();
    }
}
