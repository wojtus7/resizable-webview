package com.reanimated2playground.scrollview;

import androidx.annotation.NonNull;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.views.scroll.FpsListener;
import com.facebook.react.views.scroll.ReactScrollView;
import com.facebook.react.views.scroll.ReactScrollViewManager;

public class ScrollViewManager extends ReactScrollViewManager {

    public ScrollViewManager() {
        this(null);
    }

    public ScrollViewManager(FpsListener fpsListener) {
        super(fpsListener);
    }

    @Override
    public ReactScrollView createViewInstance(ThemedReactContext context) {
        return new ScrollView(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "PlaygroundScrollViewManager";
    }
}
