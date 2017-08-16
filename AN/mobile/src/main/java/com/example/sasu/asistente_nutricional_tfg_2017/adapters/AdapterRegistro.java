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
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.sasu.asistente_nutricional_tfg_2017.Fragments.Registro;
import com.example.sasu.asistente_nutricional_tfg_2017.R;
import com.example.sasu.asistente_nutricional_tfg_2017.models.Alimento;
import com.example.sasu.asistente_nutricional_tfg_2017.models.enumerados.HorarioComida;
import com.example.sasu.asistente_nutricional_tfg_2017.screens.Main_menu2;
import com.example.sasu.asistente_nutricional_tfg_2017.utilidades.ControllerPreferences;
import com.squareup.picasso.Picasso;
import com.squareup.picasso.Target;

import java.util.List;

/**
 * Created by mrsas on 08/06/2017.
 */

public class AdapterRegistro extends RecyclerView.Adapter<AdapterRegistro.RegistroViewHolder> {

    List<Alimento> listaAlimentos;
    private Context context;

    public static class RegistroViewHolder extends RecyclerView.ViewHolder{

        public CardView cardviewAlimento;
        public TextView nombre;
        public Button botonEliminar;
        //public ImageView foto;
        Context context;
        Alimento alimento;

        ControllerPreferences controller = ControllerPreferences.getInstance();

        public RegistroViewHolder(View itemView) {
            super(itemView);

            context = itemView.getContext();
            cardviewAlimento = (CardView) itemView.findViewById(R.id.cardViewAlimento);
            nombre = (TextView) itemView.findViewById(R.id.nombreAlimento);
            botonEliminar = (Button) itemView.findViewById(R.id.eliminarItem);

            botonEliminar.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    controller.setHorarioRegistrar(HorarioComida.DESAYUNO);
                    controller.eliminarComida(alimento);

                    Log.println(Log.INFO,"Nombre",alimento.getNAME());

                    Intent intent = new Intent(context, Main_menu2.class);
                    intent.putExtra("ReloadRegistry", 1);
                    context.startActivity(intent);
                }
            });
            //foto = (ImageView) itemView.findViewById(R.id.fotoAlimento);

        }

        public void onClick(View view) {
            controller.eliminarComida(alimento);

            Log.println(Log.INFO,"Nombre",alimento.getNAME());

            Intent intent = new Intent(context, Main_menu2.class);
            context.startActivity(intent);

        }
    }

    public AdapterRegistro(List<Alimento> listaAlimentos, Context context) {
        this.listaAlimentos = listaAlimentos;
        this.context = context;
    }

    @Override
    public RegistroViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.row_item, parent, false);
        RegistroViewHolder holder = new RegistroViewHolder(v);
        return holder;
    }

    @Override
    public void onBindViewHolder(final RegistroViewHolder holder, int position) {
        //holder.cardviewAlimento.setBackgroundResource(R.drawable.sunny);
        holder.alimento = listaAlimentos.get(position);
        Picasso.with(context).load(listaAlimentos.get(position).getPHOTO()).into(new Target() {
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
       //Picasso.with(context).load(listaAlimentos.get(position).getPHOTO()).into(holder.foto);
        holder.nombre.setText(listaAlimentos.get(position).getNAME());
    }


    @Override
    public int getItemCount() {

        return listaAlimentos.size();
    }
}
