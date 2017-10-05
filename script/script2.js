function testbuttonClick(param){
	alert (param);
}


function showSerial(param){
	var SnmpTarget= 'http://localhost/webservices/SNMP/1';
	var SoapRequestSnmp='<soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://www.xerox.com/webservices/SNMP/1">'+
					'<soapenv:Header/>' +
					'<soapenv:Body>' +
					'<ns:GetRequest>'+
					'<ns:OID>'+ param + '</ns:OID>' +
					'</ns:GetRequest>' +
					'</soapenv:Body>' +
					'</soapenv:Envelope>';
	        var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', SnmpTarget , true);
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
					if (xmlhttp.status == 200) {
                        var xmlresponse=xmlhttp.responseText;
						alert(xmlresponse);
						//alert ("200");
						//alert (xmlresponse);
					}
                }else {
					document.getElementById('content').innerHTML="NOT 200";
                }
            }
            // Send POST request
            xmlhttp.setRequestHeader('Content-Type', 'text/xml');
            xmlhttp.send(SoapRequestSnmp);
	
	
	
}