//拡張機能icon押下時の処理
chrome.browserAction.onClicked.addListener(function(tab){
    chrome.tabs.getSelected(null, function(tab) {
        var innnerText = youTubeEmbedURL(tab.url);
        //新しいwindowで開く.
        popopWindow = window.open('','youtube','width=650,height=490,scrollbars=no');
        popopWindow.document.open();
        //html要素を追加する.
        popopWindow.document.write('<html  lang="ja"><head>');
        popopWindow.document.write('<body>');
        popopWindow.document.write(innnerText);
        popopWindow.document.write('</body></html>');
        popopWindow.document.close();
    });
});

//埋め込みURLを生成する.
var youTubeEmbedURL = (text) => {
        var URLs = pregMatchAll(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, text);
        for(var i = 0; i < URLs.length; i++) {
                var url = URLs[i];
                if(url.match(/(?:http:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\/)?(.+)/g)) {
                        // v = idのキー要素
                        var youTubeId = getParameterByName('v', url);
                        if(youTubeId == '') youTubeId = url.replace(/(?:http:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\/)?(.+)/g, '$1');
                        text = text.replace(url, '<iframe width="620" height="420" src="http://www.youtube.com/embed/'+youTubeId+'" frameborder="0" allowfullscreen></iframe>');
                }
        }
        return text;
};

//URLをチェックする.
var pregMatchAll = (regex, text) => {
        var globalMatch = text.match(regex);
        var matchArray = new Array();
        for(var i in globalMatch) {
                try {
                        var nonGlobalRegex = new RegExp(regex);
                        var nonGlobalMatch = globalMatch[i].match(nonGlobalRegex);
                        matchArray.push(nonGlobalMatch[0]);
                } catch(e){
                }
        }
        return matchArray;
};

//youtube動画idを取得する.
var getParameterByName = (key, url) => {
        //?以下はkey=value&...の繰り返し.
        var queryString = url.split("?");
        if(queryString.length >= 2) {
                var params = queryString[1].split("&");
                var i = 0;
                while(i < params.length) {
                        //key=array[0]とvalue=array[1]の形式へ分割.
                        var param_item = params[i].split("=");
                        //key = "v"
                        if(param_item[0] == key) return param_item[1];
                        i++;
                }
        }
        return "";
};
