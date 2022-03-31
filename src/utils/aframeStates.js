window.AFRAME.registerComponent("increase-action", {
  init: function () {
    var el = this.el;
    el.addEventListener("click", function () {
      el.sceneEl.emit("increasescore", { points: 1, foundToken: el });
      el.setAttribute('class', "foundToken")
    });
  },
});

window.AFRAME.registerState({
  initialState: {
    score: 0
  },

  handlers: {
    increasescore: function (state, action) {
      state.score += action.points;
    },
  },
});
