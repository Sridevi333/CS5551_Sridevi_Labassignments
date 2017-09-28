package tutorial.cs5551.com.productfinder;


import android.support.v7.app.AppCompatActivity;

import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathFactory;


public class ProductFinderActivity extends AppCompatActivity {
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.activity_productfinder);
        yes = (Button) findViewById(R.id.button);

        yes.setOnClickListener(this);

        ArrayList<TextView> textViewList = new ArrayList<TextView>();
        textViewList.add((TextView) findViewById(R.id.result_1));
        textViewList.add((TextView) findViewById(R.id.result_2));
        textViewList.add((TextView) findViewById(R.id.result_3));
        textViewList.add((TextView) findViewById(R.id.result_4));
        textViewList.add((TextView) findViewById(R.id.result_5));
        int i = 0;
        for (Concept concept : cc) {
            if (i > 4) break;
            textViewList.get(i).setText(concept.name() + "\t" + concept.value());

            i++;
        }
    }
    public final static String EBAY_APP_ID = "SrideviM-ImageRec-PRD-b5d74fc8f-13829bee";
    public final static String EBAY_FINDING_SERVICE_URI = "http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME="
            + "{operation}&SERVICE-VERSION={version}&SECURITY-APPNAME="
            + "{applicationId}&GLOBAL-ID={globalId}&keywords={keywords}"
            + "&paginationInput.entriesPerPage={maxresults}";
    public static final String SERVICE_VERSION = "1.0.0";
    public static final String OPERATION_NAME = "findItemsByKeywords";
    public static final String GLOBAL_ID = "EBAY-US";
    public final static int REQUEST_DELAY = 3000;
    public final static int MAX_RESULTS = 1;
    public void run(String tag) throws Exception {

        String address = createAddress(tag);
        print("sending request to :: ", address);
        String response = URLReader.read(address);
        print("response :: ", response);
        //process xml dump returned from EBAY
        processResponse(response);
        //Honor rate limits - wait between results
        Thread.sleep(REQUEST_DELAY);


    }

    private String createAddress(String tag) {

        //substitute token
        String address = EbayDriver.EBAY_FINDING_SERVICE_URI;
        address = address.replace("{version}", EbayDriver.SERVICE_VERSION);
        address = address.replace("{operation}", EbayDriver.OPERATION_NAME);
        address = address.replace("{globalId}", EbayDriver.GLOBAL_ID);
        address = address.replace("{applicationId}", EbayDriver.EBAY_APP_ID);
        address = address.replace("{keywords}", tag);
        address = address.replace("{maxresults}", "" + this.maxResults);

        return address;

    }
    private void processResponse(String response) throws Exception {


        XPath xpath = XPathFactory.newInstance().newXPath();
        InputStream is = new ByteArrayInputStream(response.getBytes("UTF-8"));
        DocumentBuilderFactory domFactory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = domFactory.newDocumentBuilder();


        Document doc = builder.parse(is);
        XPathExpression ackExpression = xpath.compile("//findItemsByKeywordsResponse/ack");
        XPathExpression itemExpression = xpath.compile("//findItemsByKeywordsResponse/searchResult/item");

        String ackToken = (String) ackExpression.evaluate(doc, XPathConstants.STRING);
        print("ACK from ebay API :: ", ackToken);
        if (!ackToken.equals("Success")) {
            throw new Exception(" service returned an error");
        }

        NodeList nodes = (NodeList) itemExpression.evaluate(doc, XPathConstants.NODESET);

        for (int i = 0; i < nodes.getLength(); i++) {

            Node node = nodes.item(i);

            String title = (String) xpath.evaluate("title", node, XPathConstants.STRING);
            String categoryName = (String) xpath.evaluate("categoryName", node, XPathConstants.STRING);
            String location = (String) xpath.evaluate("location", node, XPathConstants.STRING);
            String currentPrice = (String) xpath.evaluate("sellingStatus/currentPrice", node, XPathConstants.STRING);
            String i1qtemURL = (String) xpath.evaluate("viewItemURL", node, XPathConstants.STRING);

        }
        is.close();

    }
    public static void main(String[] args) throws Exception {
        EbayDriver driver = new EbayDriver();
        String tag = "Velo binding machine";
        driver.run(java.net.URLEncoder.encode(tag, "UTF-8"));

    }
    public class URLReader {

        public static String read(String address) throws Exception {

            URL url = new URL(address);
            URLConnection connection = url.openConnection();
            connection.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows; U; Windows NT 6.1; zh-CN; rv:1.9.2.8) Gecko/20100722 Firefox/3.6.8");

            String line;
            String response;
            long totalBytes = 0  ;

            StringBuilder builder = new StringBuilder();
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            while ((line = reader.readLine()) != null) {
                builder.append(line);
                totalBytes += line.getBytes("UTF-8").length ;
                //System.out.println("Total bytes read ::  " + totalBytes);
            }

            response = builder.toString();

            return response ;
        }

    }
}