package tutorial.cs5551.com.texttospeech;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.FacebookSdk;
import com.facebook.login.LoginManager;
import com.facebook.login.LoginResult;
import com.facebook.login.widget.LoginButton;


public class loginActivity extends AppCompatActivity {
    TextView txtstatus;
    LoginButton login_button;
    CallbackManager callbackManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        FacebookSdk.sdkInitialize(getApplicationContext());
        setContentView(R.layout.activity_login);
        initializeControls();
        loginWithFB();
    }

    public void checkCredentials(View v)
    {
        EditText usernameCtrl = (EditText)findViewById(R.id.TFusername);
        EditText passwordCtrl = (EditText) findViewById(R.id.TFpassword);
        TextView errorText = (TextView)findViewById(R.id.lbl_Error);
        String userName = usernameCtrl.getText().toString();
        String password = passwordCtrl.getText().toString();

        boolean validationFlag = false;
        //Verify if the username and password are not empty.
        if(!userName.isEmpty() && !password.isEmpty()) {
            if(userName.equals("sridevi@gmail.com") && password.equals("Password")) {
                validationFlag = true;

            }
        }
        if(!validationFlag)
        {
            errorText.setVisibility(View.VISIBLE);
        }
        else
        {
            //This code redirects the from login page to the home page.
            Intent nextpage = new Intent(loginActivity.this, Display.class);
            startActivity(nextpage);
        }

    }
    public void SignUp(View v)
    {
        Intent redirect = new Intent(loginActivity.this,SignUp.class);
        startActivity(redirect);
    }
    public void initializeControls(){
        callbackManager = CallbackManager.Factory.create();
        txtstatus = (TextView)findViewById(R.id.txtstatus);
        login_button=(LoginButton)findViewById(R.id.login_button);
    }
    private void loginWithFB(){
        LoginManager.getInstance().registerCallback(callbackManager, new FacebookCallback<LoginResult>() {
            @Override
            public void onSuccess(LoginResult loginResult) {
                txtstatus.setText("Login Success\n"+loginResult.getAccessToken());
            }

            @Override
            public void onCancel() {
                txtstatus.setText("Login cancelled");
            }

            @Override
            public void onError(FacebookException error) {
                txtstatus.setText("Login Error:"+error.getMessage());
            }
        });
    }
    @Override
    protected void onActivityResult(final int requestCode, final int resultCode, final Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        callbackManager.onActivityResult(requestCode, resultCode, data);
    }
}