<?

$fh = fopen('FIRESTATIONS.csv.txt','r');

$fireArray = array();

while (!feof($fh))
{
 
  $addrData = fgetcsv($fh);

  $fireArray[] = 
    array('id' => trim($addrData[0]),
		  'name' => trim($addrData[1]),
  	      'address' => trim($addrData[2]),
  	      'city' => trim($addrData[3]),
  	      'EMS' => trim($addrData[4]),
		  'type' => trim($addrData[6]),
  	      'latitude' => trim($addrData[8]),
  	      'longtitude' => trim($addrData[7])
  	     );

  echo "<pre>";
  print_r($fireArray);  
  echo "</pre>";

  sleep(1.4);

}

$myPropertyMapString = 'var listStations = ' . json_encode($fireArray) . ';';

file_put_contents("convData.js", $myPropertyMapString);


?>