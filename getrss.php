<?php
	header("Access-Control-Allow-Origin: *");
	// header("Access-Control-Allow-Methods: PUT, GET, POST");
	// header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

	$xml = $_GET["feed"];
	// echo $xml;

	$xmlDoc = new DOMDocument();
	$xmlDoc->load($xml);
	// echo $xmlDoc->saveXML();

	$channel = $xmlDoc->getElementsByTagName('channel')->item(0);
	// echo $channel->nodeValue;

	$channel_title = $channel->getElementsByTagName('title')->item(0)->childNodes->item(0)->nodeValue;
	// echo $channel_title;

	echo '<div class="rss-view-content"><table id="rssFeed">';
	//$arr = array(); // TODO !!!
	$items = $channel->getElementsByTagName('item');
	for($i=0; $i<10; $i++){
		$item_title = $items->item($i)->getElementsByTagName('title')->item(0)->childNodes->item(0)->nodeValue;
		$item_link = $items->item($i)->getElementsByTagName('link')->item(0)->childNodes->item(0)->nodeValue;
		$item_date = $items->item($i)->getElementsByTagName('pubDate')->item(0)->childNodes->item(0)->nodeValue;

		$tr = "<tr><td id='rssItem'><p><span id='rssDate'>";
		$tr.= substr($item_date,0,11);
        $tr.= " | </span>"."<a href='".$item_link."' id='rssTitle'>".$item_title."</a></p></td>"."</tr>";
        echo $tr;
        //$arr[$i] = array('title'=>$item_title, 'link'=>$item_link, 'date'=>$item_date); // TODO !!!
	}
	echo '</table></div>';
	//echo json_encode($arr); // TODO !!!
	
	// phpinfo();  // Print PHP version and config info
?>