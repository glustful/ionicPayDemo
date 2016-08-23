package com.yoopoon.cordova.plugin.alipay;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.Random;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaArgs;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CordovaPreferences;
import org.json.JSONException;
import org.json.JSONObject;

import android.os.Handler;
import android.os.Message;
import android.view.View;
import android.widget.Toast;

import com.alipay.sdk.app.PayTask;

public class Alipay extends CordovaPlugin{
	public static  String partner;
	public static String rsa_private;
	public static String rsa_public;
	
	private static final int SDK_PAY_FLAG = 1;
	private static final int SDK_CHECK_FLAG = 2;
	CallbackContext currentCallbackContext;
	
	@Override
	public boolean execute(String action, CordovaArgs args,
			CallbackContext callbackContext) throws JSONException {
		// save the current callback context
		currentCallbackContext = callbackContext;
		if (action.equals("pay")) {
			return pay(args);
		}
		return true;
	}
	
	@Override
	public void initialize(CordovaInterface cordova, CordovaWebView webView) {
		super.initialize(cordova, webView);
		
	}

	private Handler mHandler = new Handler() {
		public void handleMessage(Message msg) {
			switch (msg.what) {
			case SDK_PAY_FLAG: {
				Result resultObj = new Result((String) msg.obj);
				String resultStatus = resultObj.resultStatus;
				
				currentCallbackContext.success(resultStatus);
				
//				// 判断resultStatus 为“9000”则代表支付成功，具体状态码代表含义可参考接口文档
//				if (TextUtils.equals(resultStatus, "9000")) {
//					
//					Toast.makeText(cordova.getActivity(), "支付成功",
//							Toast.LENGTH_SHORT).show();
//				} else {
//					// 判断resultStatus 为非“9000”则代表可能支付失败
//					// “8000” 代表支付结果因为支付渠道原因或者系统原因还在等待支付结果确认，最终交易是否成功以服务端异步通知为准（小概率状态）
//					if (TextUtils.equals(resultStatus, "8000")) {
//						Toast.makeText(cordova.getActivity(), "支付结果确认中",
//								Toast.LENGTH_SHORT).show();
//
//					} else {
//						Toast.makeText(cordova.getActivity(), "支付失败",
//								Toast.LENGTH_SHORT).show();
//
//					}
//				}
				break;
			}
			case SDK_CHECK_FLAG: {
				Toast.makeText(cordova.getActivity(), "检查结果为：" + msg.obj,
						Toast.LENGTH_SHORT).show();
				break;
			}
			default:
				break;
			}
		};
	};

	

	/**
	 * call alipay sdk pay. 调用SDK支付
	 * 
	 */
	private  boolean pay(CordovaArgs args) {
		try {
			JSONObject orderInfoArgs =  args.getJSONObject(0);
			String subject = orderInfoArgs.getString("subject");
			String body = orderInfoArgs.getString("body");
			String price = orderInfoArgs.getString("price");
			String tradeNo = orderInfoArgs.getString("tradeNo");
			String timeout = orderInfoArgs.getString("timeout");
			String notifyUrl = orderInfoArgs.getString("notifyUrl");
			String seller = orderInfoArgs.getString("seller");
			
			partner = orderInfoArgs.optString("partner", "");
			rsa_private = orderInfoArgs.optString("rsa_private", "");
			rsa_public = orderInfoArgs.optString("rsa_public", "");
			
			//"测试的商品", "该测试商品的详细描述", "0.01","30m","www.justep.com"
			String orderInfo = getOrderInfo(seller,subject,body,price,tradeNo,timeout,notifyUrl);
			String sign = sign(orderInfo);
			try {
				// 仅需对sign 做URL编码
				sign = URLEncoder.encode(sign, "UTF-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
			final String payInfo = orderInfo + "&sign=\"" + sign + "\"&"
					+ getSignType();

			Runnable payRunnable = new Runnable() {

				@Override
				public void run() {
					// 构造PayTask 对象
					PayTask alipay = new PayTask(cordova.getActivity());
					// 调用支付接口
					String result = alipay.pay(payInfo,true);

					Message msg = new Message();
					msg.what = SDK_PAY_FLAG;
					msg.obj = result;
					mHandler.sendMessage(msg);
				}
			};

			Thread payThread = new Thread(payRunnable);
			payThread.start();
			
			
		} catch (JSONException e1) {
			e1.printStackTrace();
			currentCallbackContext.error("订单参数不正确");
		}
		
		
		return true;
	}

	/**
	 * check whether the device has authentication alipay account.
	 * 查询终端设备是否存在支付宝认证账户
	 * 
	 */
	public void check(View v) {
		Runnable checkRunnable = new Runnable() {

			@Override
			public void run() {
				PayTask payTask = new PayTask(cordova.getActivity());
				boolean isExist = true;

				Message msg = new Message();
				msg.what = SDK_CHECK_FLAG;
				msg.obj = isExist;
				mHandler.sendMessage(msg);
			}
		};

		Thread checkThread = new Thread(checkRunnable);
		checkThread.start();

	}

	/**
	 * get the sdk version. 获取SDK版本号
	 * 
	 */
	public void getSDKVersion() {
		PayTask payTask = new PayTask(cordova.getActivity());
		String version = payTask.getVersion();
		Toast.makeText(cordova.getActivity(), version, Toast.LENGTH_SHORT).show();
	}

	/**
	 * create the order info. 创建订单信息
	 * 
	 */
	public String getOrderInfo(String seller,String subject, String body, String price,String tradeNo,String timeout,String notifyUrl) {
		// 合作者身份ID
		String orderInfo = "partner=" + "\"" + partner + "\"";

		// 卖家支付宝账号
		orderInfo += "&seller_id=" + "\"" + seller + "\"";

		// 商户网站唯一订单号
		orderInfo += "&out_trade_no=" + "\"" + tradeNo + "\"";

		// 商品名称
		orderInfo += "&subject=" + "\"" + subject + "\"";

		// 商品详情
		orderInfo += "&body=" + "\"" + body + "\"";

		// 商品金额
		orderInfo += "&total_fee=" + "\"" + price + "\"";

		// 服务器异步通知页面路径
		orderInfo += "&notify_url=" + "\"" + notifyUrl
				+ "\"";

		// 接口名称， 固定值
		orderInfo += "&service=\"mobile.securitypay.pay\"";

		// 支付类型， 固定值
		orderInfo += "&payment_type=\"1\"";

		// 参数编码， 固定值
		orderInfo += "&_input_charset=\"utf-8\"";

		// 设置未付款交易的超时时间
		// 默认30分钟，一旦超时，该笔交易就会自动被关闭。
		// 取值范围：1m～15d。
		// m-分钟，h-小时，d-天，1c-当天（无论交易何时创建，都在0点关闭）。
		// 该参数数值不接受小数点，如1.5h，可转换为90m。
		orderInfo += "&it_b_pay=\""+timeout+"\"";

		// 支付宝处理完请求后，当前页面跳转到商户指定页面的路径，可空
		orderInfo += "&return_url=\"m.alipay.com\"";

		// 调用银行卡支付，需配置此参数，参与签名， 固定值
		// orderInfo += "&paymethod=\"expressGateway\"";

		return orderInfo;
	}

	/**
	 * get the out_trade_no for an order. 获取外部订单号
	 * 
	 */
	public String getOutTradeNo() {
		SimpleDateFormat format = new SimpleDateFormat("MMddHHmmss",
				Locale.getDefault());
		Date date = new Date();
		String key = format.format(date);

		Random r = new Random();
		key = key + r.nextInt();
		key = key.substring(0, 15);
		return key;
	}

	/**
	 * sign the order info. 对订单信息进行签名
	 * 
	 * @param content
	 *            待签名订单信息
	 */
	public String sign(String content) {
		return SignUtils.sign(content, rsa_private);
	}

	/**
	 * get the sign type we use. 获取签名方式
	 * 
	 */
	public String getSignType() {
		return "sign_type=\"RSA\"";
	}

}
