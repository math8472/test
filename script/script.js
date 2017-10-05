function test(){
	}
//SNMP Abfragen
var devTypeValue=Array();
function getSNMPInfo(arrayNumber){
    var OID=new Array();
    /* 
    0 - OID['Maschinentyp']='.1.3.6.1.2.1.25.3.2.1.3.1';
    1 - OID['Seriennummer']='.1.3.6.1.4.1.253.8.53.3.2.1.3.1';
    2 - OID['SW-Seiten']='.1.3.6.1.4.1.253.8.53.13.2.1.6.1.20.33';
    3 - OID['Farbseiten']='.1.3.6.1.4.1.253.8.53.13.2.1.6.1.20.34';
    4 - Versalink: OID['Seriennummer']='.1.3.6.1.2.1.43.5.1.1.17.1';
	5 - Versalink: OID['Seriennummer]=xcmHrDevInfoSerialNumber.1;*/
    var OID=['.1.3.6.1.2.1.25.3.2.1.3.1','.1.3.6.1.4.1.253.8.53.3.2.1.3.1','.1.3.6.1.4.1.253.8.53.13.2.1.6.1.20.33','.1.3.6.1.4.1.253.8.53.13.2.1.6.1.20.34','.1.3.6.1.2.1.43.5.1.1.17.1.1','.1.3.6.1.2.1.43.10.2.1.4.1.1'];
    var i=0;
    OID.forEach(function(OIDElement){
        var devTypeResponse = xrxWsSnmpGet( "http://127.0.0.1", "public", OIDElement , null, null, 0, false);
        var devTypeData = xrxWsSnmpParseGet(devTypeResponse);
        devTypeValue[i]=devTypeData.returnValue;
        i=i+1;
    });
    return devTypeValue[arrayNumber];
}





function SNMPRequest(OID){
	var SnmpTarget= 'http://localhost/webservices/SNMP/1';
	var SoapRequestSnmp='<soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://www.xerox.com/webservices/SNMP/1">'+
					'<soapenv:Header/>' +
					'<soapenv:Body>' +
					'<ns:GetRequest>'+
					'<ns:OID>'+ OID + '</ns:OID>' +
					'</ns:GetRequest>' +
					'</soapenv:Body>' +
					'</soapenv:Envelope>';
	SOAPRequest(SnmpTarget,SoapRequestSnmp);	
	
}


function startcopy(){
	var copytarget='http://localhost/webservices/CopyService/1';
	var copyrequest='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns="http://xml.namespaces.xerox.com/enterprise/CopyService/1">' +
   '<soapenv:Header/>' +
   '<soapenv:Body>' +
      '<ns:InitiateCopyJobRequest>' +
      '</ns:InitiateCopyJobRequest>' +
   '</soapenv:Body>' +
 '</soapenv:Envelope>';
 
 SOAPRequest(copytarget,copyrequest);
 
 
}


function mycopy(){

var copyticket='<InitiateCopyJobRequest xmlns="http://xml.namespaces.xerox.com/enterprise/CopyService/1"></InitiateCopyJobRequest>';
xrxCopyInitiateCopyJob( "http://127.0.0.1", copyticket, cb_success, cb_failure);
}

function cb_success(envelope, response){
 var jobID1 = xrxCopyParseInitiateJob( response );
 //document.getElementById( 'titlepane' ).innerHTML = "Copy JobID is " + jobID + "... ";
 alert(jobID1);
}

function cb_failure(request, response, status){
 alert( xrxParseErrorResponseToString( response ) );
 }







function SOAPRequest(SoapTarget,SoapRequest){
	document.getElementById('content').innerHTML="CONTENT";
	        var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', SoapTarget , true);
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
					if (xmlhttp.status == 200) {
                        var xmlresponse=xmlhttp.responseText;
						document.getElementById('content').innerHTML="TEst200" + xmlresponse;
						//alert ("200");
						//alert (xmlresponse);
					}
                }else {
					document.getElementById('content').innerHTML="NOT 200";
                }
            }
            // Send POST request
            xmlhttp.setRequestHeader('Content-Type', 'text/xml');
            xmlhttp.send(SoapRequest);
}
function callbacksuccess(){
	console.log("CB Success");
}



function ticketcopy2(){
	var soapticket='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns="http://xml.namespaces.xerox.com/enterprise/CopyService/1">' +
   '<soapenv:Header/>' +
   '<soapenv:Body>' +
      '<ns:InitiateCopyJobRequest>' +
         '<!--Optional:-->' +
         '<ns:CopyJobTicketXmlDocument>' +
			 '<?xml version="1.0" encoding="utf-8"?>' +
				'<CopyJobTicket xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.xerox.com/enterprise/eipjobmodel/1">' +
					'<JobProcessing>' +
						'<Input>' +
						'</Input>' +
						'<Output>' +
						'<Copies>1</Copies>' +
						'<ColorEffectsType>MonochromeGreyscale</ColorEffectsType>' +
						'</Output>' +
					'</JobProcessing>' +
				'</CopyJobTicket>' +
			'</ns:CopyJobTicketXmlDocument>' +
      '</ns:InitiateCopyJobRequest>' +
   '</soapenv:Body>' +
'</soapenv:Envelope>';
	        var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'http://127.0.0.1/webservices/CopyService/1' , true);
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
					if (xmlhttp.status == 200) {
						//alert ("200");
                        var xmlresponse=xmlhttp.responseText;
						//alert ("200");
						//alert (xmlresponse);
					}
                }else {
					//alert ("N200");
                }
            }
            // Send POST request
            xmlhttp.setRequestHeader('Content-Type', 'text/xml');
            xmlhttp.send(soapticket);
}
function callbacksuccess(){
	console.log("CB Success");
}
