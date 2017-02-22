package com.example.sasu.asistente_nutricional_tfg_2017.Fragments;

import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;

import com.example.sasu.asistente_nutricional_tfg_2017.R;

/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link LoginFragment.OnFragmentInteractionListener} interface
 * to handle interaction events.
 */
public class LoginFragment extends Fragment {
    LinearLayout input_user_layout;
    LinearLayout input_password_layout;
    EditText input_user;
    EditText input_password;
    Button registration;
    Button login;


    private OnFragmentInteractionListener mListener;

    public LoginFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.fragment_login, container, false);
        // Inflate the layout for this fragment

        input_user_layout = (LinearLayout) view.findViewById(R.id.input_user_layout);
        input_user = (EditText) view.findViewById(R.id.input_user);

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

        input_password_layout = (LinearLayout) view.findViewById(R.id.input_password_layout);
        input_password = (EditText) view.findViewById(R.id.input_password);

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

        registration = (Button) view.findViewById(R.id.btn_registration);

        registration.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                RegistrationFragment registrationFragment = new RegistrationFragment();
                FragmentManager fragmentManager = getFragmentManager();

                FragmentTransaction transaction = fragmentManager.beginTransaction();

                transaction.addToBackStack(transaction.toString());
                transaction.setCustomAnimations(R.anim.slide_in_left,R.anim.slide_out_left, R.anim.slide_in_left, R.anim.slide_out_left );
                //transaction.setCustomAnimations(R.anim.slide_in_left,R.anim.slide_out_left);
                transaction.replace(R.id.activity_Main_Login,registrationFragment);


                transaction.commit();
            }
        });


        return view;
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
