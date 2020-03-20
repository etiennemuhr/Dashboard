import React from "react";
import { Page, Text, Document, StyleSheet, View } from "@react-pdf/renderer";
import moment from "moment/min/moment-with-locales";

moment.locale("de");

const ReceiptPDF = props => {
  const { customerData, receiptData, settingsData } = props;

  return (
    <Document>
      <Page style={styles.wrapper}>
        <View fixed>
          <View>
            <Text break>LOGO</Text>
          </View>
          <View>
            <Text style={styles.smallText}>
              {`${settingsData.company} ${settingsData.street} | ${settingsData.zipCode} ${settingsData.city}`}
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.companyContainer}>
              <Text break>{customerData.company}</Text>
              <Text break>{customerData.street}</Text>
              <Text>{`${customerData.zipCode} ${customerData.city}`}</Text>
            </View>
            <View style={styles.companyToContainer}>
              <Text break>{settingsData.company}</Text>
              <Text break>{settingsData.street}</Text>
              <Text
                break
              >{`${settingsData.zipCode} ${settingsData.city}`}</Text>
            </View>
          </View>
          <View style={styles.companyToContact}>
            <Text break>{settingsData.phone}</Text>
            <Text break>{settingsData.email}</Text>
            <Text>{settingsData.website}</Text>
          </View>
          <View style={styles.line}></View>
          <Text style={styles.receiptTitel}>Rechnung</Text>
          <View style={styles.receiptDetailContainer}>
            <View style={styles.receiptDetailLeft}>
              <Text style={styles.text}>
                Rechnungsnummer: {receiptData.receiptNumber}
              </Text>
              <Text style={styles.text}>
                Kundennummer: {receiptData.customer}
              </Text>
            </View>
            <View style={styles.receiptDetailRight}>
              <Text style={styles.text}>
                Rechnungsdatum:
                {moment(receiptData.createdAt).format("Do MMMM YYYY")}
              </Text>
              <Text style={styles.text}>E-Mail: {settingsData.email}</Text>
            </View>
          </View>
        </View>
        <View style={styles.tableWrapper} fixed>
          <View style={styles.tableFirstLine}></View>
          <View style={styles.tableHead}>
            <View style={styles.posBoundery}>
              <Text style={styles.tableTextBody}>Pos.</Text>
            </View>
            <View style={styles.itemNumberBoundery}>
              <Text style={styles.tableTextBody}>Artikelnummer</Text>
            </View>
            <View style={styles.typeBoundery}>
              <Text style={styles.tableTextBody}>Bezeichnung</Text>
            </View>
            <View style={styles.amountBoundery}>
              <Text style={styles.tableTextBody}>Menge</Text>
            </View>
            <View style={styles.pricePerAmountBoundery}>
              <Text style={styles.tableTextBody}>Preis(€)</Text>
            </View>
            <View style={styles.totalBoundery}>
              <Text style={styles.tableTextBody}>Gesamt(€)</Text>
            </View>
          </View>
          <View style={styles.tableLine}></View>
        </View>
        {receiptData.receiptData.map((data, index) => (
          <View
            style={(index + 1) % 16 === 0 ? styles.tableRowContainer : null}
            key={data._id}
          >
            <View style={styles.tableRow}>
              <View style={styles.tableHead}>
                <View style={styles.posBoundery}>
                  <Text style={styles.tableTextBody}>{data.pos}</Text>
                </View>
                <View style={styles.itemNumberBoundery}>
                  <Text style={styles.tableTextBody}>{data.productNumber}</Text>
                </View>
                <View style={styles.typeBoundery}>
                  <Text style={styles.tableTextBody}>{data.type}</Text>
                </View>
                <View style={styles.amountBoundery}>
                  <Text style={styles.tableTextBody}>{data.amount}</Text>
                </View>
                <View style={styles.pricePerAmountBoundery}>
                  <Text style={styles.tableTextBody}>
                    {data.pricePerProduct}€
                  </Text>
                </View>
                <View style={styles.totalBoundery}>
                  <Text style={styles.tableTextBody}>{data.total}€</Text>
                </View>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.tableTotalWrapper}>
          <View style={styles.totalWrapper}>
            <View style={styles.textTotalWrapper}>
              <Text style={styles.tableTextTotal}>Netto</Text>
            </View>
            <View style={styles.dataTotalWrapper}>
              <Text style={styles.tableDataTotal}>{receiptData.net}€</Text>
            </View>
          </View>
          <View style={styles.totalWrapper}>
            <View style={styles.textTotalWrapper}>
              <Text style={styles.tableTextTotal}>Ust</Text>
            </View>
            <View style={styles.dataTotalWrapper}>
              <Text style={styles.tableDataTotal}>{receiptData.ust}€</Text>
            </View>
          </View>
          <View style={styles.totalWrapper}>
            <View style={styles.textTotalWrapper}>
              <Text style={styles.tableTextTotal}>Brutto</Text>
            </View>
            <View style={styles.dataTotalWrapper}>
              <Text style={styles.tableDataTotal}>{receiptData.brutto}€</Text>
            </View>
          </View>
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
        <View fixed style={styles.footer}>
          <Text>
            Muster GmbH · Sparkasse Berlin · Konto 10 25 25 25 · BLZ 500 600 26
            · IBAN DE10 25 25 25 500 600 26 02· BIC HERAKLES02 Sitz der
            Gesellschaft: Berlin, Deutschland · Geschäftsführung: Max Mustermann
            · Handelsregister: AG Berlin HRB 123456 · USt-IdNr. DE216398573
            Diese Rechnungsvorlage wurde erstellt von www.weclapp.com
          </Text>
        </View>
      </Page>
      {/* <Page>
      <Text style={styles.text}>
        Es, pues, de saber, que este sobredicho hidalgo, los ratos que estaba
        ocioso (que eran los más del año) se daba a leer libros de caballerías
        con tanta afición y gusto, que olvidó casi de todo punto el ejercicio de
        la caza, y aun la administración de su hacienda; y llegó a tanto su
        curiosidad y desatino en esto, que vendió muchas hanegas de tierra de
        sembradura, para comprar libros de caballerías en que leer; y así llevó
        a su casa todos cuantos pudo haber dellos; y de todos ningunos le
        parecían tan bien como los que compuso el famoso Feliciano de Silva:
        porque la claridad de su prosa, y aquellas intrincadas razones suyas, le
        parecían de perlas; y más cuando llegaba a leer aquellos requiebros y
        cartas de desafío, donde en muchas partes hallaba escrito: la razón de
        la sinrazón que a mi razón se hace, de tal manera mi razón enflaquece,
        que con razón me quejo de la vuestra fermosura, y también cuando leía:
        los altos cielos que de vuestra divinidad divinamente con las estrellas
        se fortifican, y os hacen merecedora del merecimiento que merece la
        vuestra grandeza.
      </Text>
    </Page> */}
    </Document>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: "25 70",
    position: "relative"
  },
  text: {
    fontSize: 12
  },

  smallText: {
    fontSize: 10
  },
  tableRowContainer: {
    marginBottom: 500
  },
  companyContainer: {
    fontSize: 12,
    marginTop: 20,
    width: 250
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row"
  },
  companyToContainer: {
    fontSize: 12,
    marginTop: 20,
    marginLeft: 30
  },
  companyToContact: {
    fontSize: 12,
    marginTop: 20,
    marginLeft: 281
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "grey",
    marginTop: 25
  },
  receiptTitel: {
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 20
  },
  receiptDetailContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 15
  },
  receiptDetailLeft: { width: 260 },
  receiptDetailRight: {
    marginLeft: 20
  },
  tableWrapper: {},
  tableFirstLine: {
    height: 1,
    width: "100%",
    backgroundColor: "grey",
    marginTop: 15
  },
  tableLine: {
    height: 1,
    width: "100%",
    backgroundColor: "grey"
  },
  tableHead: {
    display: "flex",
    flexDirection: "row"
  },
  tableTextHeadFirst: {
    fontSize: 11,
    margin: "5 0"
  },
  tableTextHead: {
    fontSize: 11,
    margin: "5 15"
  },
  tableRow: { borderBottom: "1 solid lightgrey" },
  tableTextBody: {
    fontSize: 10,
    textAlign: "center",
    margin: "7 0"
  },
  posBoundery: {
    width: 20
  },

  itemNumberBoundery: {
    width: 100
  },

  typeBoundery: {
    width: 150
  },

  amountBoundery: {
    width: 50
  },

  pricePerAmountBoundery: {
    width: 62
  },
  totalBoundery: {
    width: 73
  },

  tableTotalWrapper: {
    marginLeft: 333
  },
  totalWrapper: {
    display: "flex",
    padding: "7 0",
    borderBottom: "1 solid lightgrey",
    position: "relative"
  },
  textTotalWrapper: {
    textAlign: "left"
  },
  tableTextTotal: { fontSize: 10 },
  dataTotalWrapper: {},
  tableDataTotal: {
    fontSize: 10,
    textAlign: "center",
    position: "absolute",
    marginLeft: 46,
    top: "-10"
  },
  footer: {
    position: "absolute",
    fontSize: 8,
    bottom: 10,
    left: 10,
    right: 10,
    textAlign: "center",
    color: "grey"
  },

  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 45,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
    borderTop: "1 solid lightgrey",
    padding: "15 0 0 0"
  }
});

export default ReceiptPDF;
