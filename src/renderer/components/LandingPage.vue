<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue" />
    <main>
      <div class="left-side">
        <p style="line-break: auto;">{{ consoleoutput1 }}</p>
        <span class="title">--------</span>
        <p>{{ consoleoutput2 }}</p>
      </div>

      <div class="right-side">
        <div class="doc">
          <textarea v-model="command"></textarea>
          <button class="alt" @click="open()">nodepwr</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import SystemInformation from "./LandingPage/SystemInformation";
import { commandPromise } from "../controller/nodepwr";

export default {
  name: "landing-page",
  data() {
    return {
      consoleoutput1: null,
      consoleoutput2: null,
      command: ""
    };
  },
  components: { SystemInformation },
  methods: {
    open() {
      (async () => {
        try {
          console.log("in")
          this.consoleoutput1 = await commandPromise(this.command)
        }
        catch (err) {
          console.log("ASYNC :" + err.name)
          this.consoleoutput1 = err.name;
          throw err;
        }
      })();

    }
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100vh;
  padding: 60px 80px;
  width: 100vw;
}

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 420px;
}

main {
  display: flex;
  justify-content: space-between;
}

main > div {
  flex-basis: 50%;
}

.left-side {
  display: flex;
  flex-direction: column;

  & span {
    color: red;
  }
}

.welcome {
  color: #555;
  font-size: 23px;
  margin-bottom: 10px;
}

.title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}

.title.alt {
  font-size: 18px;
  margin-bottom: 10px;
}

.doc p {
  color: black;
  margin-bottom: 10px;
}

.doc button {
  font-size: 0.8em;
  cursor: pointer;
  outline: none;
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #4fc08d;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
}

.doc button.alt {
  color: #42b983;
  background-color: transparent;
}
</style>
