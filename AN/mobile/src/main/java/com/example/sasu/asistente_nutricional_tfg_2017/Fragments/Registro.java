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
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import com.example.sasu.asistente_nutricional_tfg_2017.R;
import com.example.sasu.asistente_nutricional_tfg_2017.adapters.AdapterRegistro;
import com.example.sasu.asistente_nutricional_tfg_2017.models.Alimento;
import com.example.sasu.asistente_nutricional_tfg_2017.models.Comida;
import com.example.sasu.asistente_nutricional_tfg_2017.models.enumerados.HorarioComida;
import com.example.sasu.asistente_nutricional_tfg_2017.utilidades.ControllerPreferences;

import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link Registro.OnFragmentInteractionListener} interface
 * to handle interaction events.
 * Use the {@link Registro#newInstance} factory method to
 * create an instance of this fragment.
 */
public class Registro extends Fragment implements AdapterView.OnItemSelectedListener {
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";
    int positionDay = 0;
    TextView diaRegistro;
    Button atras,delante;
    ControllerPreferences controllerPreferences;
    View rootView;
    // TODO: Rename and change types of parameters


    private OnFragmentInteractionListener mListener;

    public Registro() {
        controllerPreferences = ControllerPreferences.getInstance();
        // Required empty public constructor
    }

    public void diaAtras(View v){
        RecyclerView rv = (RecyclerView) rootView.findViewById(R.id.listaAlimentos);
        RecyclerView.LayoutManager llm = new LinearLayoutManager(getContext());
        rv.setLayoutManager(llm);
        Date hoy = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(hoy);
        int year = cal.get(Calendar.YEAR);
        int month = cal.get(Calendar.MONTH) + 1;
        int day = cal.get(Calendar.DAY_OF_MONTH) - 1;
        String fechaB = Integer.toString(day)+ "-" + Integer.toString(month)+"-" + Integer.toString(year);
        //Toast.makeText(getContext(),"Buscamos la fecha: "+ fechaB,Toast.LENGTH_LONG).show();
        Comida c = controllerPreferences.getComida();

        List<Alimento> alimentos = c.getLista(HorarioComida.DESAYUNO);
        //Toast.makeText(getContext(),"Tamaño: "+ alimentos.size(),Toast.LENGTH_LONG).show();



        //List<Alimento> alimentos = Arrays.asList(new Alimento("Leche"),new Alimento("Tostadas"),new Alimento("Pera"),new Alimento("Pizza"),new Alimento("mermelada"));

        AdapterRegistro adaptador= new AdapterRegistro(alimentos,getContext());
        rv.setAdapter(adaptador);
    }


    // TODO: Rename and change types and number of parameters
    public static Registro newInstance() {
        Registro fragment = new Registro();

        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);



    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
         rootView = inflater.inflate(R.layout.fragment_registro, container, false);

        Spinner spinner = (Spinner) rootView.findViewById(R.id.spinner);
// Create an ArrayAdapter using the string array and a default spinner layout
        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(getContext(),
                R.array.FOODHOURS, R.layout.spinner_item);
// Specify the layout to use when the list of choices appears
        adapter.setDropDownViewResource(R.layout.spinner_item_dropdown);
        //adapter.setDropDownViewResource(R.layout.spinner_item_dropdown);
// Apply the adapter to the spinner
        spinner.setAdapter(adapter);

        spinner.setOnItemSelectedListener(this);

        diaRegistro = (TextView) rootView.findViewById(R.id.diaRegistro);



        Date hoy = controllerPreferences.fechaActual;


        Calendar cal = Calendar.getInstance();
        cal.setTime(hoy);
        controllerPreferences.fechaActual = cal.getTime();

        int year = cal.get(Calendar.YEAR);
        int month = cal.get(Calendar.MONTH) + 1;
        int day = cal.get(Calendar.DAY_OF_MONTH);
        String fechaB = Integer.toString(day) + "-" + Integer.toString(month) + "-" + Integer.toString(year);
        //Toast.makeText(getContext(), "Buscamos la fecha: " + fechaB, Toast.LENGTH_LONG).show();
        controllerPreferences.setSegundaFecha(fechaB);
        Comida c = controllerPreferences.getComida(fechaB);




        atras = (Button) rootView.findViewById(R.id.diaAtras);
        delante = (Button) rootView.findViewById(R.id.diaDelante);

        delante.setBackground(getActivity().getDrawable(R.drawable.disable_next));
        delante.setEnabled(false);
        delante.setClickable(false);

        atras.setOnClickListener(new View.OnClickListener() {
            @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
            @Override
            public void onClick(View view) {

                if(positionDay > -2)
                {
                    positionDay--;

                    if(positionDay == -1){
                        diaRegistro.setText("Ayer");
                        delante.setBackground(getActivity().getDrawable(R.mipmap.next));
                        delante.setEnabled(true);
                        delante.setClickable(true);
                    }else if(positionDay == -2){
                        diaRegistro.setText("Anteayer");
                        atras.setBackground(getActivity().getDrawable(R.drawable.disableprevious));
                        atras.setEnabled(false);
                        atras.setClickable(false);
                    }else{
                        diaRegistro.setText("Error");
                    }

                    RecyclerView rv = (RecyclerView) rootView.findViewById(R.id.listaAlimentos);
                    RecyclerView.LayoutManager llm = new LinearLayoutManager(getContext());
                    rv.setLayoutManager(llm);
                    Date hoy = controllerPreferences.fechaActual;

                    Calendar cal = Calendar.getInstance();
                    cal.setTime(hoy);
                    cal.add(Calendar.DAY_OF_MONTH, -1);
                    controllerPreferences.fechaActual = cal.getTime();

                    int year = cal.get(Calendar.YEAR);
                    int month = cal.get(Calendar.MONTH)+1;
                    int day = cal.get(Calendar.DAY_OF_MONTH);
                    String fechaB = Integer.toString(day)+ "-" + Integer.toString(month)+"-" + Integer.toString(year);
                    controllerPreferences.setSegundaFecha(fechaB);
                    //Toast.makeText(getContext(),"Buscamos la fecha: "+ fechaB,Toast.LENGTH_LONG).show();

                    Comida c = controllerPreferences.getComida(fechaB);

                    List<Alimento> alimentos = c.getLista(controllerPreferences.getHorarioConsultar());
                    //Toast.makeText(getContext(),"Tamaño: "+ alimentos.size(),Toast.LENGTH_LONG).show();



                    //List<Alimento> alimentos = Arrays.asList(new Alimento("Leche"),new Alimento("Tostadas"),new Alimento("Pera"),new Alimento("Pizza"),new Alimento("mermelada"));

                    AdapterRegistro adaptador= new AdapterRegistro(alimentos,getContext());
                    rv.setAdapter(adaptador);
                }
            }
        });

        delante.setOnClickListener(new View.OnClickListener() {
            @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
            @Override
            public void onClick(View view) {

                if(positionDay < 0) {

                    positionDay++;

                    if(positionDay == -1){
                        diaRegistro.setText("Ayer");
                        atras.setEnabled(true);
                        atras.setBackground(getActivity().getDrawable(R.mipmap.atras));
                        atras.setClickable(true);
                    }else if(positionDay == 0){
                        diaRegistro.setText("Hoy");
                        delante.setBackground(getActivity().getDrawable(R.drawable.disable_next));
                        delante.setEnabled(false);
                        delante.setClickable(false);

                    }else{
                        diaRegistro.setText("Error");
                    }

                    RecyclerView rv = (RecyclerView) rootView.findViewById(R.id.listaAlimentos);
                    RecyclerView.LayoutManager llm = new LinearLayoutManager(getContext());
                    rv.setLayoutManager(llm);
                    Date hoy = controllerPreferences.fechaActual;


                    Calendar cal = Calendar.getInstance();
                    cal.setTime(hoy);
                    cal.add(Calendar.DAY_OF_MONTH, 1);
                    controllerPreferences.fechaActual = cal.getTime();

                    int year = cal.get(Calendar.YEAR);
                    int month = cal.get(Calendar.MONTH) + 1;
                    int day = cal.get(Calendar.DAY_OF_MONTH);
                    String fechaB = Integer.toString(day) + "-" + Integer.toString(month) + "-" + Integer.toString(year);
                    //Toast.makeText(getContext(), "Buscamos la fecha: " + fechaB, Toast.LENGTH_LONG).show();
                    controllerPreferences.setSegundaFecha(fechaB);
                    Comida c = controllerPreferences.getComida(fechaB);



                    List<Alimento> alimentos = c.getLista(controllerPreferences.getHorarioConsultar());
                    //Toast.makeText(getContext(), "Tamaño: " + alimentos.size(), Toast.LENGTH_LONG).show();


                    //List<Alimento> alimentos = Arrays.asList(new Alimento("Leche"),new Alimento("Tostadas"),new Alimento("Pera"),new Alimento("Pizza"),new Alimento("mermelada"));

                    AdapterRegistro adaptador = new AdapterRegistro(alimentos, getContext());
                    rv.setAdapter(adaptador);
                }
            }
        });




        return rootView;
    }

    public void onItemSelected(AdapterView<?> parent, View view,
                               int pos, long id) {
        // An item was selected. You can retrieve the selected item usingç

        RecyclerView rv = (RecyclerView) rootView.findViewById(R.id.listaAlimentos);
        RecyclerView.LayoutManager llm = new LinearLayoutManager(getContext());
        rv.setLayoutManager(llm);
        Date hoy = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(hoy);
        int year = cal.get(Calendar.YEAR);
        int month = cal.get(Calendar.MONTH) + 1;
        int day = cal.get(Calendar.DAY_OF_MONTH);
        String fechaB = Integer.toString(day)+ "-" + Integer.toString(month)+"-" + Integer.toString(year);
        //Toast.makeText(getContext(),"Buscamos la fecha: "+ fechaB,Toast.LENGTH_LONG).show();
        Comida c = controllerPreferences.getComida();

        List<Alimento> alimentos = null;// = c.getLista(HorarioComida.DESAYUNO);
        //Toast.makeText(getContext(),"Tamaño: "+ alimentos.size(),Toast.LENGTH_LONG).show();



        //List<Alimento> alimentos = Arrays.asList(new Alimento("Leche"),new Alimento("Tostadas"),new Alimento("Pera"),new Alimento("Pizza"),new Alimento("mermelada"));



        Object ca = parent.getItemAtPosition(pos);
        if(parent.getItemAtPosition(pos).equals("Desayuno"))
        {
            controllerPreferences.setHorarioConsultar(HorarioComida.DESAYUNO);
            alimentos = c.getLista(HorarioComida.DESAYUNO);
        }
        else if(parent.getItemAtPosition(pos).equals("Almuerzo")){
            controllerPreferences.setHorarioConsultar(HorarioComida.ALMUERZO);
            alimentos = c.getLista(HorarioComida.ALMUERZO);
        }else if(parent.getItemAtPosition(pos).equals("Merienda")){
            controllerPreferences.setHorarioConsultar(HorarioComida.MERIENDA_TARDE);
            alimentos = c.getLista(HorarioComida.MERIENDA_TARDE);
        }else if(parent.getItemAtPosition(pos).equals("Cena")){
            controllerPreferences.setHorarioConsultar(HorarioComida.CENA);
            alimentos = c.getLista(HorarioComida.CENA);
        }else if(parent.getItemAtPosition(pos).equals("Otros")){
            controllerPreferences.setHorarioConsultar(HorarioComida.OTRO);
            alimentos = c.getLista(HorarioComida.OTRO);
        }

        AdapterRegistro adaptador= new AdapterRegistro(alimentos,getContext());
        rv.setAdapter(adaptador);
    }

    public void onNothingSelected(AdapterView<?> parent) {
        // Another interface callback
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
