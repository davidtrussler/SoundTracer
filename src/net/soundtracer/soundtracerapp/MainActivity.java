package net.soundtracer.soundtracerapp;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Build;
import android.os.Build.VERSION_CODES;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class MainActivity extends Activity {
    /** Called when the activity is first created. */
    @SuppressLint("SetJavaScriptEnabled")

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		final WebView wv = (WebView) findViewById(R.id.web_holder);
        
        WebSettings settings = wv.getSettings(); 
        settings.setJavaScriptEnabled(true); 
        WebChromeClient webChrome = new WebChromeClient(); 

        if (Build.VERSION.SDK_INT >= VERSION_CODES.JELLY_BEAN) {
        	wv.getSettings().setAllowUniversalAccessFromFileURLs(true);
        }

        wv.setWebChromeClient(webChrome); 
        wv.setScrollBarStyle(WebView.SCROLLBARS_OUTSIDE_OVERLAY);
        // wv.addJavascriptInterface(new JavaScriptInterface(this), "Android");
        wv.loadUrl("file:///android_asset/index.html");
    }

	/*
	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}
	*/

    @Override
    public void onBackPressed() {
    	// add here code to go back in webview history
        final WebView wv = (WebView) findViewById(R.layout.activity_main);

        if(wv.canGoBack()) {
            wv.goBack();
    	} else {
    		super.onBackPressed(); 
    	}
    }

    /*
    public class JavaScriptInterface {
        Context mContext;

        // Instantiate the interface and set the context 
        JavaScriptInterface(Context c) {
            mContext = c;
        }

        // Show a toast from the web page 
        public void favourite(Object data) {
        	// String text = "type: " + data.type + "; " + "id: " + data.id; 
            // Toast.makeText(mContext, text, Toast.LENGTH_SHORT).show();
        }
    }
    */
}