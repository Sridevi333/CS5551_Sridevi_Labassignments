package com.example.sridevi.androidwearapplication;

import android.app.Activity;
import android.os.Bundle;
import android.os.StrictMode;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class MainActivity extends Activity {

    private TextView mTextView;
    private EditText key;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.round_activity_main);
        mTextView = (TextView) findViewById(R.id.textView_display);
        Button button = (Button) findViewById(R.id.button2);
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);
    }

    public void translate(View v) {
        key = (EditText) findViewById(R.id.editext_cityname);
        String s = key.getText().toString();
        String z = s.replace(" ", "_");

        String UR = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170911T180133Z.54a4578d96adf730.7837f987d265df0b1d6901bd1c716007498e5bd9&text="+z+"&lang=zh";
        //Toast.makeText(this, "my url="+UR, Toast.LENGTH_SHORT).show();
        String res = null;
        BufferedReader bf = null;
        try {
            URL url = new URL(UR);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            con.connect();

            bf = new BufferedReader(new InputStreamReader(con.getInputStream()));
            StringBuilder str = new StringBuilder();
            String line = null;

            // Read Server Response
            while ((line = bf.readLine()) != null) {
                // Append server response in string
                str.append(line + " ");
            }
            res = str.toString();
            // Toast.makeText(this, " "+res, Toast.LENGTH_SHORT).show();
        } catch (Exception ex) {
            String Error = ex.getMessage();
        } finally {
            try {
                bf.close();
            } catch (Exception ex) {
                String Error = ex.getMessage();
            }
        }
        try {
            JSONObject f = new JSONObject(res);

            // JSONObject n =t.getJSONObject("display_location");
            String dis = f.getString("text");

            String word=  ((EditText) findViewById(R.id.editext_cityname)).getText().toString();
            if(dis==null){
                Toast.makeText(this, "Sorry couldn't get data....!", Toast.LENGTH_SHORT).show();
            }
            mTextView.setText("Chinese Word"+":"+"\n" + dis.toString());
        } catch (Exception e) {
            // Toast.makeText(this, "weather button parse clicked", Toast.LENGTH_SHORT).show();
            String Error = e.getMessage();
        }
    }
}
