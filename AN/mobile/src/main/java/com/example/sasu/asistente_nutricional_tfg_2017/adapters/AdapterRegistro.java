package com.example.sasu.asistente_nutricional_tfg_2017.adapters;

import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.sasu.asistente_nutricional_tfg_2017.R;
import com.example.sasu.asistente_nutricional_tfg_2017.models.Alimento;

import java.util.List;

/**
 * Created by mrsas on 08/06/2017.
 */

public class AdapterRegistro extends RecyclerView.Adapter<AdapterRegistro.RegistroViewHolder> {

    List<Alimento> listaAlimentos;

    public static class RegistroViewHolder extends RecyclerView.ViewHolder{

        public CardView cardviewAlimento;
        public TextView nombre;

        public RegistroViewHolder(View itemView) {
            super(itemView);

            cardviewAlimento = (CardView) itemView.findViewById(R.id.cardViewAlimento);
            nombre = (TextView) itemView.findViewById(R.id.nombreAlimento);

        }
    }

    public AdapterRegistro(List<Alimento> listaAlimentos) {
        this.listaAlimentos = listaAlimentos;
    }

    @Override
    public RegistroViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.row_item, parent, false);
        RegistroViewHolder holder = new RegistroViewHolder(v);
        return holder;
    }

    @Override
    public void onBindViewHolder(RegistroViewHolder holder, int position) {
        holder.cardviewAlimento.setBackgroundResource(R.drawable.sunny);
        holder.nombre.setText(listaAlimentos.get(position).getNAME());
    }


    @Override
    public int getItemCount() {

        return listaAlimentos.size();
    }
}
