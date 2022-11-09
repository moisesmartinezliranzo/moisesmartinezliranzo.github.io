function Effect() {
    var self = this;

    this.meshes = [
        { file: "glasses01.bsm2", anims: [
            { a: "static", t: 0 },
        ] },
        { file: "shadow.bsm2", anims: [
            { a: "static", t: 0 },
        ] },
        { file: "glasses.bsm2", anims: [
            { a: "static", t: 0 },
        ] },
        { file: "cut.bsm2", anims: [
            { a: "static", t: 0 },
        ] },
        { file: "hat.bsm2", anims: [
            { a: "static", t: 0 },
        ] },
        { file: "cut01.bsm2", anims: [
            { a: "static", t: 0 },
        ] },
        { file: "face.bsm2", anims: [
            { a: "static", t: 0 },
        ] },
    ];

    this.play = function() {
        var now = (new Date()).getTime();
        for(var i = 0; i < self.meshes.length; i++) {
            if(now > self.meshes[i].endTime) {
                self.meshes[i].animIdx = (self.meshes[i].animIdx + 1)%self.meshes[i].anims.length;
                Api.meshfxMsg("animOnce", i, 0, self.meshes[i].anims[self.meshes[i].animIdx].a);
                self.meshes[i].endTime = now + self.meshes[i].anims[self.meshes[i].animIdx].t;
            }
        }

        // if(Api.isMouthOpen()) {
        //  Api.hideHint();
        // }
    };

    this.init = function() {
        Api.meshfxMsg("spawn", 7, 0, "!glfx_FACE");

        Api.meshfxMsg("spawn", 0, 0, "glasses01.bsm2");
        // Api.meshfxMsg("animOnce", 0, 0, "static");

        Api.meshfxMsg("spawn", 1, 0, "shadow.bsm2");
        // Api.meshfxMsg("animOnce", 1, 0, "static");

        Api.meshfxMsg("spawn", 2, 0, "glasses.bsm2");
        // Api.meshfxMsg("animOnce", 2, 0, "static");

        Api.meshfxMsg("spawn", 3, 0, "cut.bsm2");
        // Api.meshfxMsg("animOnce", 3, 0, "static");

        Api.meshfxMsg("spawn", 4, 0, "hat.bsm2");
        // Api.meshfxMsg("animOnce", 4, 0, "static");

        Api.meshfxMsg("spawn", 5, 0, "cut01.bsm2");
        // Api.meshfxMsg("animOnce", 5, 0, "static");

        Api.meshfxMsg("spawn", 6, 0, "face.bsm2");
        // Api.meshfxMsg("animOnce", 6, 0, "static");

        for(var i = 0; i < self.meshes.length; i++) {
            self.meshes[i].animIdx = -1;
            self.meshes[i].endTime = 0;
        }

        self.faceActions = [self.play];
        // Api.showHint("Open mouth");
        // Api.playVideo("frx",true,1);
        //Api.playSound("music.m4a",true,1);
        Api.showRecordButton();
    };

    this.restart = function() {
        Api.meshfxReset();
        // Api.stopVideo("frx");
        //Api.stopSound("music.m4a");
        self.init();
    };

    this.faceActions = [];
    this.noFaceActions = [];

    this.videoRecordStartActions = [];
    this.videoRecordFinishActions = [];
    this.videoRecordDiscardActions = [this.restart];
}

configure(new Effect());