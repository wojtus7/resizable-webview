package com.reanimated2playground.scrollview;

import android.view.MotionEvent;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.views.scroll.FpsListener;
import com.facebook.react.views.scroll.ReactScrollView;

public class ScrollView extends ReactScrollView {

    public ScrollView(ReactContext context) {
        super(context);
    }

    public ScrollView(ReactContext context, @Nullable FpsListener fpsListener) {
        super(context, fpsListener);
    }

    @Override
    public boolean onInterceptTouchEvent(MotionEvent ev) {
        boolean result = false;
        if (ev.getPointerCount() == 1) {
            result = super.onInterceptTouchEvent(ev);
        }
        return result;
    }

}
