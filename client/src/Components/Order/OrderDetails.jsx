import React from 'react';
import moment from 'moment';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        padding: 20,
    },
    section: {
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    info: {
        fontSize: 12,
        marginBottom: 3,
    },
    table: {
        display: 'table',
        width: '100%',
        borderStyle: 'solid',
        borderColor: '#bfbfbf',
        borderWidth: 1,
        borderCollapse: 'collapse',
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCell: {
        width: '25%',
        borderStyle: 'solid',
        borderColor: '#bfbfbf',
        borderWidth: 1,
        padding: 5,
    },
});


const OrderDetails = ({ order, handleBackToOrders }) => {
    // Calculate shipping charge (static value of 10 rupees)
    const shippingCharge = 10;
    // Calculate discount (5% of total amount)
    const discount = order.totalAmount * 0.0005;
    // Calculate GST (18% of subtotal + shipping charge after discount)
    const subtotalAfterDiscount = order.totalAmount * 0.01 - discount;
    const gst = (subtotalAfterDiscount + shippingCharge) * 0.18;

    // Extract address details from the order
    const { street, city, state, postalCode, country } = order.address.addresses[0];
    // Shipped from address
    const shippedFromAddress = (
        <>
            Literacy Ladder, <br />
            Computer Science and Engineering Department,<br />
            MNNIT, {city}, {postalCode}<br />
            {state}, {country}
        </>
    );


    const InvoiceDocument = (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>Invoice</Text>
                    <Text style={styles.info}>Order Id: {order._id}</Text>
                    <Text style={styles.info}>Date: {moment(order.timeStamp).format('MMMM, Do YYYY')}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Shipped from:</Text>
                    <Text style={styles.info}>{shippedFromAddress}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Delivered to:</Text>
                    <Text style={styles.info}>{street}</Text>
                    <Text style={styles.info}>{city}, {state}, {postalCode}</Text>
                    <Text style={styles.info}>{country}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Products:</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>Product</Text>
                            <Text style={styles.tableCell}>Author</Text>
                            <Text style={styles.tableCell}>Quantity</Text>
                            <Text style={styles.tableCell}>Price</Text>
                        </View>
                        {order.cartItems.map((item, index) => (
                            <View style={styles.tableRow} key={index}>
                                <Text style={styles.tableCell}>{item.bookId.bookName}</Text>
                                <Text style={styles.tableCell}>{item.bookId.author}</Text>
                                <Text style={styles.tableCell}>{item.quantity}</Text>
                                <Text style={styles.tableCell}>&#x20B9;{item.bookId.bookPrice}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.info}>Subtotal: {(order.totalAmount * 0.01 - shippingCharge + discount - gst).toFixed(2)}</Text>
                    <Text style={styles.info}>Shipping Charge: {shippingCharge.toFixed(2)}</Text>
                    <Text style={styles.info}>Discount (5%): -{discount.toFixed(2)}</Text>
                    <Text style={styles.info}>GST (18%): {gst.toFixed(2)}</Text>
                    <Text style={styles.total}>Total: {(order.totalAmount * 0.01).toFixed(2)}</Text>
                </View>
            </Page>
        </Document>
    );


    return (
        <div className="container mx-auto mt-10">
            <div className="bg-white shadow-md rounded-md p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold">Invoice</h1>
                    <div>
                        <div>
                            <button className="text-blue-500 hover:text-blue-700" onClick={() => handleBackToOrders()}>Back to Orders</button>
                        </div>
                        <span className="text-gray-600">Order Id: {order._id}</span>
                        <br />
                        <span className="text-gray-600">Date: {moment(order.timeStamp).format('MMMM, Do YYYY')}</span>
                        <br />
                        <PDFDownloadLink document={InvoiceDocument} fileName="invoice.pdf">
                            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Print Invoice')}
                        </PDFDownloadLink>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-left">
                        <p className="text-gray-800 font-semibold">Shipped from:</p>
                        <p className="text-gray-800 font-sans">{shippedFromAddress}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-800 font-semibold">Delivered to:</p>
                        <div className="text-gray-800 font-sans">
                            <p>{street}</p>
                            <p>{city}, {state}, {postalCode}</p>
                            <p>{country}</p>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-300 pt-4">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-left">
                            <span className="text-gray-800 font-semibold">Product</span>
                        </div>
                        <div className="text-center">
                            <span className="text-gray-800 font-semibold">Quantity</span>
                        </div>
                        <div className="text-right">
                            <span className="text-gray-800 font-semibold">Price</span>
                        </div>
                    </div>
                    {order.cartItems.map(item => (
                        <div key={item._id} className="grid grid-cols-3 gap-4 items-center mb-2">
                            <div className="text-left">
                                <span className="text-gray-800">{item.bookId.bookName}</span>
                                <p className="text-gray-500">{item.bookId.author}</p>
                            </div>
                            <div className="text-center">
                                <span className="text-gray-500">{item.quantity}</span>
                            </div>
                            <div className="text-right">
                                <span className="text-gray-800">₹{item.bookId.bookPrice}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4">
                    <div className="grid grid-cols-2 gap-4 mb-2">
                        <div className="text-left">
                            <span className="text-gray-800 font-semibold">Subtotal:</span>
                        </div>
                        <div className="text-right">
                            <span className="text-gray-800">₹{(order.totalAmount * 0.01 - shippingCharge + discount - gst).toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-2">
                        <div className="text-left">
                            <span className="text-gray-800 font-semibold">Shipping Charge:</span>
                        </div>
                        <div className="text-right">
                            <span className="text-gray-800">₹{shippingCharge.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-2">
                        <div className="text-left">
                            <span className="text-gray-800 font-semibold">Discount (5%):</span>
                        </div>
                        <div className="text-right">
                            <span className="text-gray-800">-₹{discount.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-2">
                        <div className="text-left">
                            <span className="text-gray-800 font-semibold">GST (18%):</span>
                        </div>
                        <div className="text-right">
                            <span className="text-gray-800">₹{gst.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-left">
                            <span className="text-gray-800 font-semibold">Total:</span>
                        </div>
                        <div className="text-right">
                            <span className="text-gray-800 font-semibold">₹{(order.totalAmount * 0.01).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
