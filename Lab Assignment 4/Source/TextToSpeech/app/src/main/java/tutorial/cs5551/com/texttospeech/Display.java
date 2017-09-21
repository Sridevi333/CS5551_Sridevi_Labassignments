package tutorial.cs5551.com.texttospeech;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import java.util.Locale;

public class Display extends Activity {

    TextToSpeech ttobject;
    int result;
    EditText et;
    String text;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.display);
        String username = getIntent().getStringExtra("Username");
        //TextView tv = (TextView) findViewById(R.id.TVusername);
        //tv.setText(username);
        et= (EditText)findViewById(R.id.editText);
        ttobject = new TextToSpeech(Display.this, new TextToSpeech.OnInitListener() {
            public void onInit(int status) {

                if (status == TextToSpeech.SUCCESS) {
               result= ttobject.setLanguage(Locale.US);
                } else {

                    Toast.makeText(getApplicationContext(), "Feature not supported in your device", Toast.LENGTH_SHORT).show();

                }

            }
        });

    }
    public void onC(View v) {
        Intent redirect = new Intent(Display.this, loginActivity.class);
        startActivity(redirect);
    }

    public void doSomething(View v) {

        switch (v.getId()) {

            case R.id.bspeak:

                if(result== TextToSpeech.LANG_NOT_SUPPORTED||result== TextToSpeech.LANG_MISSING_DATA){
                    Toast.makeText(getApplicationContext(), "Feature not supported in your device", Toast.LENGTH_SHORT).show();


            }else{
                         text=et.getText().toString();
                    ttobject.speak(text, TextToSpeech.QUEUE_FLUSH,null);


            }


                break;

            case R.id.bstopspeaking:

                if(ttobject!=null)
                {

                    ttobject.stop();
                }

                break;

        }


    }
protected void onDestroy()
{

    super.onDestroy();
    ttobject.stop();
    ttobject.shutdown();
}
}