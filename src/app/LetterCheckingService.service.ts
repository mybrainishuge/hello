import { Injectable } from '@angular/core';
import { AppState } from './app.service';

@Injectable()
export class LetterCheckingService {

  public controller = this.appState._initLeapController(
    this.deviceStopped_CB.bind(this),
    this.deviceStreaming_CB.bind(this)
  );
  public target: string = '';
  public isLetter: boolean;
  public connected = false;
  public letter: string = '';
  private letters: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'l', 'o', 's', 'u', 'w'];
  private url: string = '';
  private results = [];
  private _ = require('underscore');

  constructor(private appState: AppState) { }

  deviceStopped_CB() {
    this.connected = false;
  }

  deviceStreaming_CB() {
    this.connected = true;
  }

  _initCheckingService() {
    this.controller.connect();
    this.controller.on('connect', () => {})
    this.controller.on('disconnect', () => {})
    this.watch();
  }

  watch() {
    this.controller.on ('frame', (frame) => {

      frame.hands.forEach((hand) => {
        let data = [];
        let input = {};

        if (this._(hand.fingers).every(finger => !finger.extended)) {
          hand.fingers.forEach(finger => {
            data.push(finger.extended, finger.direction);
          });

          input['target'] = this.target;
          input['extended'] = false;
          input['rotated'] = hand.pinky.mcpPosition[1] - hand.indexFinger.mcpPosition[1];
          input['oc'] = hand.middleFinger.stabilizedTipPosition[2] - hand.thumb.stabilizedTipPosition[2];
          input['e'] = hand.thumb.stabilizedTipPosition[2] - hand.middleFinger.stabilizedTipPosition[2];
          input['a'] = hand.thumb.stabilizedTipPosition[0] - hand.indexFinger.pipPosition[0];
          input['s'] = hand.thumb.stabilizedTipPosition[1] - hand.indexFinger.pipPosition[1];
          input['t'] = hand.thumb.stabilizedTipPosition[0] > hand.indexFinger.pipPosition[0] && hand.thumb.stabilizedTipPosition[0] < hand.middleFinger.stabilizedTipPosition[0] && hand.thumb.pipPosition[1] > hand.indexFinger.pipPosition[1];
          input['n'] = hand.thumb.stabilizedTipPosition[0] > hand.middleFinger.pipPosition[0] && hand.thumb.stabilizedTipPosition[0] < hand.ringFinger.pipPosition[0] && hand.thumb.pipPosition[1] > hand.middleFinger.pipPosition[1];
          input['m'] = hand.thumb.stabilizedTipPosition[0] > hand.ringFinger.mcpPosition[0] && hand.thumb.stabilizedTipPosition[0] < hand.pinky.mcpPosition[0] && hand.thumb.pipPosition[1] > hand.middleFinger.pipPosition[1];;

        } else {
          //This starts the section for if not all fingers are closed
          input['extended'] = true;
          input['rotated'] = hand.pinky.mcpPosition[1] - hand.indexFinger.mcpPosition[1];
          input['thumbExtended'] = hand.thumb.stabilizedTipPosition[2] - hand.indexFinger.mcpPosition[2]; //this could be wrong
          input['indexExtended'] = hand.indexFinger.extended;
          input['middleExtended'] = hand.middleFinger.extended;
          input['ringExtended'] = hand.ringFinger.extended;
          input['pinkyExtended'] = hand.pinky.extended;

          input['gh'] = hand.indexFinger.stabilizedTipPosition[0] - hand.middleFinger.stabilizedTipPosition[0];
          input['td'] = hand.thumb.stabilizedTipPosition[1] - hand.indexFinger.mcpPosition[1];
          input['md'] = hand.indexFinger.mcpPosition[1] - hand.middleFinger.stabilizedTipPosition[1];
          input['id'] = hand.middleFinger.mcpPosition[1] - hand.indexFinger.stabilizedTipPosition[1];
          input['tbr'] = hand.ringFinger.stabilizedTipPosition[0] - hand.thumb.stabilizedTipPosition[0];
          input['ibm'] = hand.middleFinger.stabilizedTipPosition[1] - hand.indexFinger.stabilizedTipPosition[1];
          input['uvk'] = hand.indexFinger.stabilizedTipPosition[0] = hand.indexFinger.stabilizedTipPosition[0];
          input['vk'] = hand.ringFinger.stabilizedTipPosition[1] - hand.thumb.stabilizedTipPosition[1];
          input['xd'] = hand.middleFinger.stabilizedTipPosition[2] - hand.thumb.stabilizedTipPosition[2];
          input['x'] = hand.indexFinger.stabilizedTipPosition[1] - hand.indexFinger.pipPosition[1];
          input['f'] = hand.indexFinger.stabilizedTipPosition[1] - hand.thumb.stabilizedTipPosition[1];
        }

        var checked = this.checkInput(input);
         if (!!checked) {
           this.letter = checked;
         }
      })
    })
  }

  getLetter() {
    return this.letter;
  }

  getIsLetter() {
    return this.isLetter;
  }


  checkInput(input) {

    let extenedFingers = [];
    extenedFingers.push(+input.thumbExtended,+input.indexExtended,+input.middleExtended, +input.ringExtended, +input.pinkyExtended);

    var checkExtendedNet = require('./neurons/checkExtended.js');
    var extendedCheckResults = checkExtendedNet.run([1,1,1,1,1]);
    if (input.extended) {
      let rotated_checkNet = require('./neurons/isRotated.js');
      let isRotated = rotated_checkNet.run([input.rotated]);  //input.rotated
      if(isRotated.true > isRotated.false) {
        let GH_checkNet = require('./neurons/gh_yRangeFinder.js');
        //This check is working with dummy data
        let isGH = GH_checkNet.run(input.gh);
        if(isGH.g > isGH.h) {
          this.results.push('G');
        } else {
          this.results.push('H');
        }
      } else {
        let TD_checkNet = require('./neurons/isThumbDown.js');
        let isTD = TD_checkNet.run([input.td]); //input.td
        if (isTD.true > isTD.false) {
          let MD_checkNet = require('./neurons/isMiddleDown.js');
          let isMD = MD_checkNet.run([input.md]);
          if (isMD.true > isMD.false) {
            this.results.push('P');
            //P
          } else {
            let ID_checkNet = require('./neurons/isIndexDown.js');
            let isID = ID_checkNet.run([input.id]);
            if (isTD.true > isTD.false) {
              //Q
              this.results.push('Q');
            }
          }

        } else {
          //check if index is out
          let IP_checkNet = require('./neurons/isIndexExtended.js');
          let isIP = IP_checkNet.run([input.indexExtended]);
          if (isIP.true > isIP.false) {
            // check if middle is out
             let MP_checkNet = require('./neurons/isMiddleExtended.js');
             let isMP = MP_checkNet.run([input.middleExtended]);
             if(isMP.true > isMP.false) {
              //middle is out - check if ringfinger is out
              let RP_checkNet = require('./neurons/isRingExtended.js');
              let isRP = RP_checkNet.run([input.ringExtended]);
              if(isRP.true > isRP.false) {
              //ring is out - check if pinky is out
                let PK_checkNet = require('./neurons/isPinkyExtended.js');
                let isPK = PK_checkNet.run([input.pinkyExtended])
                if(isPK.true > isPK.false) {
                //pinky is out - check thumb
                  let TBR_checkNet = require('./neurons/isThumbBelowRing.js');
                  let isTBR = TBR_checkNet.run([input.tbr]);
                  if (isTBR.true > isTBR.false) {
                    //B
                    this.results.push('B');
                  }
                } else {
                  //W
                  this.results.push('W');
                }
              } else {
                //Check if Index is below M
                let IBM_checkNet = require('./neurons/isIndexBelowMiddle.js');
                let isIBM = IBM_checkNet.run([input.ibm]);
                if (isIBM.true > isIBM.false) {
                  //R
                  this.results.push('R');
                } else {
                  //check to see ifthe tips of the index and middle are close together.
                  let UVK_checkNet = require('./neurons/indexMiddle_xRangeFinder.js');
                  let isUVK = UVK_checkNet.run([input.uvk]);
                  if (isUVK.true > isUVK.false) {
                    //U
                    this.results.push('U');
                  } else {
                    //check thumb position for V and K
                    let VK_checkNet = require('./neurons/thumbRing_yRangeFinder.js');
                    let isVK = VK_checkNet.run([input.vk]);
                    if (isVK.true > isVK.false) {
                      //V
                      this.results.push('V');
                    } else {
                      //K
                      this.results.push('K');
                    }
                  }
                }
              }
             } else {
              //check to see if the thumb is out
              let TE_checkNet = require('./neurons/isThumbExtended.js');
              let isTE = TE_checkNet.run([input.thumbExtended]);
              if (isTE.true > isTE.false) {
                //L
                this.results.push('L');
              } else {
                //Check for X
                let XD_checkNet = require('./neurons/thumbMiddle_zTipRangeFinder.js');
                let isXD = XD_checkNet.run([input.xd]);
                if (isXD.true > isXD.false) {
                  this.results.push('D');
                  //D
                } else {
                  //check index tip y against index tip index pip y
                  let X_checkNet = require('./neurons/isIndexTipBelowIndexPip.js');
                  let isX = X_checkNet.run([input.x]);
                  if(isX.true > isX.false) {
                    //X  this is super hard
                    this.results.push('X')
                  }
                }
              }
            }
          } else {
            //check if thumb is below index
            let TI_checkNet= require('./neurons/thumbIndexTip_yRangeFinder.js');
            let isTI = TI_checkNet.run([input.f]);
            if (isTI.true > isTI.false) {
              //F
              this.results.push('F');
            }
          }
        }
      }

    } else {
      //CLOSED POSITION LETTERS DECISION TREE
      //is not extended then send to neuron that will parse
      //and transfer data to [a, e, m, n, o, s, t, c] paths
      //Check for rotation
      let rotated_checkNet = require('./neurons/isRotated.js');
      let isRotated = rotated_checkNet.run([input.rotated]);  //input.rotated

      if(isRotated.true > isRotated.false) {
        let OC_checkNet = require('./neurons/thumbMiddle_zTipRangeFinder');
        let isOC = OC_checkNet.run([input.oc]);
        //TODO: look at re adjusting the C to extended - need to improve this performance
        if (isOC.true > isOC.false) {
          this.results.push('O')
        } else {
          this.results.push('C');
        }
      } else {
        let E_checkNet = require('./neurons/isthumbBelow.js');
        let isE = E_checkNet.run([input.e]);
        if(isE.true > isE.false)  {
          this.results.push('E');
        } else {
          let A_checkNet = require('./neurons/thumbTipIndexKnuck_xRangeFinder');
          let isA = A_checkNet.run([input.a]);
          if(isA.true > isA.false) {
            this.results.push('A');
          } else {
            let S_checkNet = require('./neurons/thumbMiddle_yRangeFinder.js');
            let isS = S_checkNet.run([input.s]);
            if(isS.true > isS.false) {
              this.results.push('S');
            } else if (input.t) {
              this.results.push('T');
            } else if (input.n) {
              this.results.push('N');
            } else if(input.m) {
              this.results.push('M');
            } else {
            }
          }
        }

      }

    }
      const numSamples = 30;
      var response;
      if(this.results.length === numSamples) {
        let str = this.results.join('');
        if (input.target) {
          let target = input.target;
          let reg = new RegExp(target,'g');
          let num = (str.match(reg) || []).length;
          if (num / numSamples > 0.5) {
            this.results = [];
            response = true;
            this.isLetter = true;
          } else {
            this.results = [];
            response = false;
            this.isLetter = false;
          }
        } else {
          let holder = {};

          this.results.forEach(result => {
            if (holder.hasOwnProperty(result)) {
              holder[result]++
            } else {
              holder[result] = 1;
            }
          });
          var rep = 0;
          for (let key in holder) {
            if (holder[key] > rep) {
              rep = holder[key];
              response = key;
              this.results= [];
            }
          }
        }
      }
      return response;

  }
}
