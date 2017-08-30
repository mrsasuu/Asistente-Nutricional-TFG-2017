package com.example.sasu.asistente_nutricional_tfg_2017.Fragments;

import android.content.Context;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.RequiresApi;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.example.sasu.asistente_nutricional_tfg_2017.R;
import com.example.sasu.asistente_nutricional_tfg_2017.adapters.AdapterObjetivo;
import com.example.sasu.asistente_nutricional_tfg_2017.models.Alimento;
import com.example.sasu.asistente_nutricional_tfg_2017.models.Objetivo;
import com.example.sasu.asistente_nutricional_tfg_2017.models.Tabla;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link Inicio.OnFragmentInteractionListener} interface
 * to handle interaction events.
 * Use the {@link Inicio#newInstance} factory method to
 * create an instance of this fragment.
 */
public class Inicio extends Fragment {
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    LinearLayout layout;
    TextView welcome;
    FrameLayout welcomeImage;

    // TODO: Rename and change types of parameters


    private OnFragmentInteractionListener mListener;

    public Inicio() {
        // Required empty public constructor
    }

    // TODO: Rename and change types and number of parameters
    public static Inicio newInstance() {
        Inicio fragment = new Inicio();
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment

        View view = inflater.inflate(R.layout.fragment_inicio, container, false);

        /*layout = (LinearLayout) view.findViewById(R.id.objetiveHorizontalScroll);


        for (int i = 0; i < yourData.size(); i++) {
            TextView tv = new TextView(getApplicationContext());
            tv.setText(yourData.get(i));
            layout.addView(tv);
        }*/



        welcome =  (TextView) view.findViewById(R.id.welcomeText);
        welcomeImage = (FrameLayout) view.findViewById(R.id.welcomeImage);

        changeWelcomeMessage();

        RecyclerView rv = (RecyclerView) view.findViewById(R.id.listaObjetivos);
        RecyclerView.LayoutManager llm = new LinearLayoutManager(getContext(), LinearLayoutManager.HORIZONTAL, false);
        rv.setLayoutManager(llm);
        List<Objetivo> objetivos = new ArrayList<>();

        /*
        objetivos.add(new Objetivo(0,"Pizza Margarita","","http://mrsasuu.hopto.org/static/img/foods/pizza_margarita.jpg",2,0,0,0));

        objetivos.add(new Objetivo(0,"Otra cosa","","http://mrsasuu.hopto.org/static/img/foods/breakfast.jpg",2,0,0,0));
        */

        Date hoy = new Date();
        //Log.println(Log.INFO,"HORA", String.valueOf(hoy.getTime()));
        Calendar cal = Calendar.getInstance();
        cal.setTime(hoy);
        //Log.println(Log.INFO,"DIA",cal.getTime());
        int year = cal.get(Calendar.YEAR);
        int month = cal.get(Calendar.MONTH) + 1;
        int day = cal.get(Calendar.DAY_OF_MONTH);

        List<Objetivo> objetivosDB = Objetivo.listAll(Objetivo.class);

        String fechaB = Integer.toString(day)+ "-" + Integer.toString(month)+"-" + Integer.toString(year);

        List<Tabla> registros = Tabla.find(Tabla.class,"fecha = ?",fechaB);

        for(int i = 0; i < objetivosDB.size(); i++){
            double apariciones = 0;
            objetivosDB.get(i).setPROGRESS(0);
            for(int j = 0; j < registros.size(); j++){

                Alimento al = Alimento.findById(Alimento.class,registros.get(j).getIdAlimento());
                if(al != null)
                {
                    if(( al.getFOODID() == objetivosDB.get(i).getFOODID())){
                        apariciones+= registros.get(j).getAmount();
                    }
                }
            }



            if(objetivosDB.get(i).getAMOUNT() <= apariciones){
                objetivosDB.get(i).setPROGRESS(apariciones);
            }else{
                objetivosDB.get(i).setPROGRESS(apariciones);

                //Alimento al = Alimento.findById(Alimento.class,objetivosDB.get(i).getFOODID());

                Alimento al = Alimento.find(Alimento.class,"FOODID = ?", Integer.toString(objetivosDB.get(i).getFOODID())).get(0);

                double amountNeeded = objetivosDB.get(i).getAMOUNT() - apariciones;

                int porciones = 0;
                double tamPorcion = 0;

                String porcionTexto;

                if(amountNeeded <= al.getMINAMOUNT()){
                    tamPorcion = al.getMINAMOUNT();
                    porcionTexto = " porcion/es pequeña/s de ";
                }else if(al.getMINAMOUNT() < amountNeeded && amountNeeded < al.getMAXAMOUNT()){
                    tamPorcion = al.getMEDAMOUNT();
                    porcionTexto = " porcion/es mediana/s de ";
                }else{
                    tamPorcion = al.getMAXAMOUNT();
                    porcionTexto = " porcion/es grande/s de ";
                }

                while(amountNeeded > 0){
                    porciones++;

                    amountNeeded-= tamPorcion;
                }

                objetivosDB.get(i).setFOODNAME(porciones + porcionTexto +  objetivosDB.get(i).getFOODNAME());


                objetivos.add(objetivosDB.get(i));
            }
        }

        if(objetivos.size() == 0){
            objetivos.add(new Objetivo(-1,"","","http://mrsasuu.hopto.org/static/img/completed.jpg",0,0,0,0));
        }


        AdapterObjetivo adaptador = new AdapterObjetivo(objetivos,getContext());
        rv.setAdapter(adaptador);



        return view;
    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    private void changeWelcomeMessage() {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.HOUR_OF_DAY, 06);
        calendar.set(Calendar.MINUTE, 00);
        calendar.set(Calendar.SECOND, 00);

        long morning = calendar.getTimeInMillis();

        calendar.set(Calendar.HOUR_OF_DAY, 12);
        calendar.set(Calendar.MINUTE, 00);
        calendar.set(Calendar.SECOND, 01);

        long lunch = calendar.getTimeInMillis();

        calendar.set(Calendar.HOUR_OF_DAY, 21);
        calendar.set(Calendar.MINUTE, 30);
        calendar.set(Calendar.SECOND, 01);

        long night = calendar.getTimeInMillis();

        long time = new Date().getTime();

        if( morning <= time && time < lunch){
            welcome.setText("¡Buenos días!");
            welcomeImage.setBackground(getActivity().getDrawable(R.drawable.sunny));

        }else if( lunch <= time && time < night){
            welcome.setText("¡Buenas tardes!");
            welcomeImage.setBackground(getActivity().getDrawable(R.drawable.evening));
        }else{
            welcome.setText("¡Buenas noches!");
            welcomeImage.setBackground(getActivity().getDrawable(R.drawable.night));
        }
    }

    // TODO: Rename method, update argument and hook method into UI event
    public void onButtonPressed(Uri uri) {
        if (mListener != null) {
            mListener.onFragmentInteraction(uri);
        }
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnFragmentInteractionListener) {
            mListener = (OnFragmentInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnFragmentInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    /**
     * This interface must be implemented by activities that contain this
     * fragment to allow an interaction in this fragment to be communicated
     * to the activity and potentially other fragments contained in that
     * activity.
     * <p>
     * See the Android Training lesson <a href=
     * "http://developer.android.com/training/basics/fragments/communicating.html"
     * >Communicating with Other Fragments</a> for more information.
     */
    public interface OnFragmentInteractionListener {
        // TODO: Update argument type and name
        void onFragmentInteraction(Uri uri);
    }
}
