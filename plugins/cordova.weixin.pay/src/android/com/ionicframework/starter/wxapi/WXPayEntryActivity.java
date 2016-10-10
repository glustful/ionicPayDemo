package com.sharedParking.mz.wxapi;

import com.tencent.mm.sdk.constants.ConstantsAPI;
import com.tencent.mm.sdk.modelbase.BaseReq;
import com.tencent.mm.sdk.modelbase.BaseResp;
import com.tencent.mm.sdk.openapi.IWXAPI;
import com.tencent.mm.sdk.openapi.IWXAPIEventHandler;
import com.tencent.mm.sdk.openapi.WXAPIFactory;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import com.atide.cordova.plugin.weixin.Weixin;

public class WXPayEntryActivity extends Activity implements IWXAPIEventHandler{

	private static final String TAG = "WXPayEntryActivity";

      private IWXAPI api;

      @Override
      public void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          View view = new View(this);
          setContentView(view);
      	api = WXAPIFactory.createWXAPI(this, Weixin.app_id);
          api.handleIntent(getIntent(), this);
      }

  	@Override
  	protected void onNewIntent(Intent intent) {
  		super.onNewIntent(intent);
  		setIntent(intent);
          api.handleIntent(intent, this);
  	}

  	@Override
  	public void onReq(BaseReq req) {
  	}

  	@Override
  	public void onResp(BaseResp resp) {
  		if (resp.getType() == ConstantsAPI.COMMAND_PAY_BY_WX) {
			try {
				Class mClass = WXPayEntryActivity.class.getClassLoader().loadClass(getPackageName() + ".MainActivity");
				Intent intent = new Intent(this, mClass);
				Bundle bundle = new Bundle();
				bundle.putInt("weixinPayRespCode", resp.errCode);
				bundle.putString("intentType", "weixin");
				intent.putExtras(bundle);
				intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
				Log.i(TAG, "startActivity");
				startActivity(intent);
			}catch (Exception e){
				e.printStackTrace();

			}
  		}
		finish();
  	}
}
