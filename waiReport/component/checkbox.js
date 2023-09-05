(function() {
    var YRCompBase = {
        declare    : {
            'type'    : 'checkbox',
            'default' : { }
        },
        properties : {
            'alignment'         : {'type': typeof(''), visible: true, readonly: false, defaultValue: ''},    //체크박스이름위치 : 좌, 우, 중앙
            'backColor'         : {'type': typeof(''), visible: true, readonly: false, defaultValue: ''},    //체크박스배경색
            'backStyle'         : {'type': typeof(''), visible: true, readonly: false, defaultValue: ''},    //체크박스배경투명도
            'caption'           : {'type': typeof(''), visible: true, readonly: false, defaultValue: ''},    //체크박스TEXT
            'className'         : {'type': typeof(''), visible: true, readonly: false, defaultValue: ''},    //체크박스ClassName
            'dataField'         : {'type': typeof(''), visible: true, readonly: false, defaultValue: ''},    //체크박스ClassName
            //체크박스폰트 : font-family: 'Consolas'(종류); font-weight: bold(굵기); font-size: 12pt;(폰트크기) font-style: italic(기울기);
            'fontFamily'        : {'type': typeof(''), visible: true, readonly: false, defaultValue: ''},
            'fontWeight'        : {'type': typeof(0), visible: true, readonly: false, defaultValue: 1},
            'fontSize'          : {'type': typeof(0), regefx: '', readonly: false, defaultValue: ''},
            'fontStyle'         : {'type': typeof(0), visible: true, readonly: false, defaultValue: 1},
            'fontColor'         : {'type': typeof(''), visible: true, readonly: false, defaultValue: ''},    //체크박스폰트색
            'value'             : {'type': typeof(0), visible: true, readonly: false, defaultValue: 0}
        },
        initialize : function() {
            //console.log(this.declare.type+' : initialize');
        },
        execDraw   : function(aCtx) {
            return;

            var self = this;
            var chkCaption = self.caption;
            var dfLeft = self.left;
            var dfTop = self.top;
            var dfWidth = self.width;
            var dfHeight = self.height;
            var chkFontFamily = self.fontFamily;
            var chkFontSize = Number(self.fontSize);
            var chkFontColor = self.fontColor;
            var chkFont = chkFontSize + "px "+ chkFontFamily;
            var chkAlignment = self.alignment;
            var chkAlignLeft = chkAlignment;
            var chkVerAlignTop = dfHeight/2;
            var chkTop = dfHeight/2;

            var chkFontWeight;
            var chkFontStyle;
            var chkValue;

            if(self.fontStyle == 0)
            {
                chkFontStyle = true;
            }
            else
            {
                chkFontStyle = false;
            }

            if(self.fontWeight == 0)
            {
                chkFontWeight = true;
            }
            else
            {
                chkFontWeight = false;
            }

            if(self.value == 0)
            {
                chkValue = true;
            }
            else
            {
                chkValue = false;
            }

            var chkCanvas = document.createElement('canvas');
            var chkCtx = chkCanvas.getContext("2d");

            chkCanvas.width = dfWidth;
            chkCanvas.height = dfHeight;

            chkCtx.fillStyle = "rgba(0,0,0,0.05)";
            chkCtx.fillRect(0, 0, dfWidth, dfWidth);

            // Caption Alignment
            if(chkAlignment == 'left')
            {
                chkAlignLeft = 2 + 12;
                chkCtx.textAlign = 'left';
            }
            else if(chkAlignment == 'center')
            {
                chkAlignLeft = (Number(dfWidth) + (chkFontSize/2))/2;
                chkCtx.textAlign = 'center';
            }
            else if(chkAlignment == 'right')
            {
                chkAlignLeft = Number(dfWidth) - 12 - 2;
                chkCtx.textAlign = 'right';
            }

            //Font 굵기, 기울기 처리
            if(chkFontWeight == true || chkFontStyle == true)
            {
                if(chkFontWeight == true && chkFontStyle == true)
                {
                    chkFont = 'bold italic ' + chkFont;
                }
                else if(chkFontWeight == true && chkFontStyle == false)
                {
                    chkFont = 'bold ' + chkFont;
                }
                else
                {
                    chkFont = 'italic ' + chkFont;
                }
            }
            else
            {
                chkFont = '' + chkFont;
            }
            // Draw text
            chkCtx.font = chkFont;
            chkCtx.fillStyle = chkFontColor;
            chkCtx.textBaseline = 'middle';

            // Text newline
            var words = chkCaption.split(' ');
            var line = '';
            var lineCount = 0;
            var i;
            var tmpText;
            var metrics;
            var tmpWords = chkCaption.split(' ');
            var tmpLine = '';
            var tmpLineCount = 0;
            var tmpI;
            var tmpWord;
            var tmpMetrics;

            for (tmpI = 0; tmpI < tmpWords.length; tmpI++)
            {
                tmpWord = tmpWords[tmpI];
                tmpMetrics = chkCtx.measureText(tmpWord);

                while (tmpMetrics.width > dfWidth - 2)
                {
                    // Determine how much of the word will fit
                    tmpWord = tmpWord.substring(0, tmpWord.length - 1);
                    tmpMetrics = chkCtx.measureText(tmpWord);
                }

                if (tmpWords[tmpI] != tmpWord)
                {
                    tmpWords.splice(tmpI + 1, 0,  tmpWords[tmpI].substr(tmpWord.length));
                    tmpWords[tmpI] = tmpWord;
                }
                tmpWord = tmpLine + tmpWords[tmpI] + ' ';

                tmpMetrics = chkCtx.measureText(tmpWord);

                if (tmpMetrics.width > dfWidth-2 && tmpI > 0)
                {
                    tmpLine = tmpWords[tmpI] + ' ';
                    tmpLineCount++;
                }
                else
                {
                    tmpLine = tmpWord;
                }
            }

            for (i = 0; i < words.length; i++)
            {
                tmpText = words[i];
                metrics = chkCtx.measureText(tmpText);

                while (metrics.width > dfWidth - 2)
                {
                    // Determine how much of the word will fit
                    tmpText = tmpText.substring(0, tmpText.length - 1);
                    metrics = chkCtx.measureText(tmpText);
                }

                if (words[i] != tmpText)
                {
                    words.splice(i + 1, 0,  words[i].substr(tmpText.length));
                    words[i] = tmpText;
                }
                tmpText = line + words[i] + ' ';

                metrics = chkCtx.measureText(tmpText);

                if (metrics.width > dfWidth-2 && i > 0)
                {
                    console.log("1. TEXT Loc : " + chkAlignLeft + " || " + chkVerAlignTop);
                    chkCtx.fillText(line, chkAlignLeft, chkVerAlignTop - Number(tmpLineCount * chkFontSize/2));
                    line = words[i] + ' ';
                    chkVerAlignTop = Number(chkVerAlignTop) + Number(chkFontSize);
                    lineCount++;
                }
                else
                {
                    line = tmpText;
                }
            }
            chkCtx.fillText(line, chkAlignLeft, chkVerAlignTop - ((tmpLineCount * chkFontSize)/2));
            //chkCtx.fillText(chkCaption, chkAlignLeft, chkVerAlignTop);

            // Draw Box
            chkCtx.beginPath();

            if(chkAlignment == 'left'||chkAlignment == 'center')
            {
                if(chkValue == true)
                {
                    chkCtx.moveTo( 0, chkTop - 6); //좌측상단모서리
                    chkCtx.lineTo( 6, chkTop + 6); //중앙하단라인
                    chkCtx.moveTo( 6, chkTop + 6); //중앙하단라인
                    chkCtx.lineTo(12, chkTop - 6); //우측상단모서리
                }
                else
                {

                }
                chkCtx.moveTo( 0, chkTop - 6); //좌측상단모서리
                chkCtx.lineTo( 0, chkTop + 6); //좌측하단모서리
                chkCtx.moveTo( 0, chkTop - 6); //좌측상단모서리
                chkCtx.lineTo(12, chkTop - 6); //우측상단모서리
                chkCtx.moveTo(12, chkTop - 6); //우측상단모서리
                chkCtx.lineTo(12, chkTop + 6); //우측하단모서리
                chkCtx.moveTo( 0, chkTop + 6); //좌측하단모서리
                chkCtx.lineTo(12, chkTop + 6); //우측하단모서리
            }
            else if(chkAlignment == 'right')
            {
                if(chkValue == true)
                {
                    chkCtx.moveTo(dfWidth - 12, chkTop - 6); //좌측상단모서리
                    chkCtx.lineTo(dfWidth -  6, chkTop + 6); //중앙하단라인
                    chkCtx.moveTo(dfWidth -  6, chkTop + 6); //중앙하단라인
                    chkCtx.lineTo(dfWidth     , chkTop - 6); //우측상단모서리
                }
                else
                {

                }
                chkCtx.moveTo(dfWidth - 12, chkTop - 6); //좌측상단모서리
                chkCtx.lineTo(dfWidth - 12, chkTop + 6); //좌측하단모서리
                chkCtx.moveTo(dfWidth - 12, chkTop - 6); //좌측상단모서리
                chkCtx.lineTo(dfWidth     , chkTop - 6); //우측상단모서리
                chkCtx.moveTo(dfWidth     , chkTop - 6); //우측상단모서리
                chkCtx.lineTo(dfWidth     , chkTop + 6); //우측하단모서리
                chkCtx.moveTo(dfWidth - 12, chkTop + 6); //좌측하단모서리
                chkCtx.lineTo(dfWidth     , chkTop + 6); //우측하단모서리
            }

            chkCtx.strokeStyle = "black";
            chkCtx.stroke();

            chkCtx.beginPath();

            if(chkAlignment == 'left'||chkAlignment == 'center')
            {
                if(chkValue == true)
                {
                    chkCtx.moveTo( 2, chkTop - 3); //좌측상단모서리
                    chkCtx.lineTo( 6, chkTop + 4); //중앙하단라인
                    chkCtx.moveTo( 6, chkTop + 4); //중앙하단라인
                    chkCtx.lineTo(11, chkTop - 5); //우측상단모서리
                }
                else
                {

                }
            }
            else if(chkAlignment == 'right')
            {
                if(chkValue == true)
                {
                    chkCtx.moveTo(dfWidth - 10, chkTop - 3); //좌측상단모서리
                    chkCtx.lineTo(dfWidth -  6, chkTop + 4); //중앙하단라인
                    chkCtx.moveTo(dfWidth -  6, chkTop + 4); //중앙하단라인
                    chkCtx.lineTo(dfWidth -  1, chkTop - 5); //우측상단모서리
                }
                else
                {

                }
            }
            chkCtx.lineWidth = 2;
            chkCtx.strokeStyle = "black";
            chkCtx.stroke();

            aCtx.drawImage(chkCanvas, dfLeft, dfTop);
        }
    };
    $waiReport.core.addComponentBase(YRCompBase);
})();