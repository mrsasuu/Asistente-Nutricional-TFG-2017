package com.example.sasu.asistente_nutricional_tfg_2017.adapters;

import android.content.Context;
import android.content.Intent;
import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.sasu.asistente_nutricional_tfg_2017.R;
import com.example.sasu.asistente_nutricional_tfg_2017.models.Alimento;
import com.example.sasu.asistente_nutricional_tfg_2017.screens.Main_menu2;
import com.example.sasu.asistente_nutricional_tfg_2017.utilidades.ControllerPreferences;

import java.util.List;

/**
 * Created by mrsas on 08/06/2017.
 */

public class AdapterRegistrarAlimento extends RecyclerView.Adapter<AdapterRegistrarAlimento.RegistroViewHolder> {

    List<Alimento> listaAlimentos;

    public static class RegistroViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener{

        public CardView cardviewAlimento;
        public TextView nombre;
        Context context;
        ControllerPreferences controller = ControllerPreferences.getInstance();

        Alimento alimento;

        public RegistroViewHolder(View itemView) {
            super(itemView);

            context = itemView.getContext();

            cardviewAlimento = (CardView) itemView.findViewById(R.id.cardViewAlimento);
            nombre = (TextView) itemView.findViewById(R.id.nombreAlimento);

            itemView.setOnClickListener(this);

        }

        public void onClick(View view) {
            controller.registrarComidaHorario(alimento);

            Log.println(Log.INFO,"Nombre",alimento.getNAME());

            Intent intent = new Intent(context, Main_menu2.class);
            context.startActivity(intent);

        }
    }

    public AdapterRegistrarAlimento(List<Alimento> listaAlimentos) {
        this.listaAlimentos = listaAlimentos;
    }

    @Override
    public RegistroViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.row_item_registrar_alimento, parent, false);
        RegistroViewHolder holder = new RegistroViewHolder(v);
        return holder;
    }


    @Override
    public void onBindViewHolder(RegistroViewHolder holder, int position) {
        holder.alimento = listaAlimentos.get(position);
        holder.cardviewAlimento.setBackgroundResource(R.drawable.sunny);
        holder.nombre.setText(listaAlimentos.get(position).getNAME());
    }


    @Override
    public int getItemCount() {

        return listaAlimentos.size();
    }
}
