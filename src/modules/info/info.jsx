import React, { Component } from 'react'
import styles from './info.module.scss'
import PropTypes from 'prop-types'

class Info extends Component {

    constructor(props) {
        super(props);
        this.state = {
            couponCode: ""
        };
    }

    render() {

        const {
            hotels,
            hotelDetails,
            selectiveData,
            selectedRoom,
            selectedView,
            submitCouponCode,
            withCoupon,
            couponDetails,
            price,
        } = this.props

        const selectedRoomDetail = [];
        const selectedViewDetail = [];

        hotelDetails.map(function (detail, index) {
            if (detail.id == selectiveData.data.selectedHotel) {
                detail.room_type.map(function (roomDetail, index) {
                    if (roomDetail.id == selectedRoom) {
                        selectedRoomDetail.push(roomDetail);
                    }
                })
                detail.room_scenic.map(function (scenic, index) {
                    if (scenic.id == selectedView) {
                        selectedViewDetail.push(scenic);
                    }
                })
            }
        })

        const totalPriceWithoutCalc = parseInt(selectedRoomDetail[0].price) * 5;
        let totalPrice;
        if (couponDetails) {
            if (couponDetails.applied) {
                totalPrice = Math.floor(totalPriceWithoutCalc + (totalPriceWithoutCalc * selectedViewDetail[0].price_rate) / 100) - couponDetails.discount;
                // return if coupon showing
                if (withCoupon) {
                    price(totalPrice);
                }
            } else {
                totalPrice = Math.floor(totalPriceWithoutCalc + (totalPriceWithoutCalc * selectedViewDetail[0].price_rate) / 100);
                if (withCoupon) {
                    price(totalPrice);
                }
            }
        } else {
            totalPrice = Math.floor(totalPriceWithoutCalc + (totalPriceWithoutCalc * selectedViewDetail[0].price_rate) / 100);
            if (withCoupon) {
                price(totalPrice);
            }
        }


        const handleCouponChange = (e) => {
            this.setState({ couponCode: e.target.value });
        }

        return (
            <div className={withCoupon ? styles.info : styles.infoWithoutCoupon}>
                <div className={styles.info__title}>
                    <div className={styles.title}>
                        {
                            hotels.map(function (hotel, index) {
                                if (hotel.id == selectiveData.data.selectedHotel) {
                                    return hotel.hotel_name
                                }
                            })
                        }
                    </div>
                    <div className={styles.desc}>
                        {
                            hotelDetails.map(function (detail, index) {
                                if (detail.id == selectiveData.data.selectedHotel) {
                                    return <div>({detail.city})</div>;
                                }
                            })
                        }
                    </div>
                </div>
                <div className={styles.info__cards}>
                    <div className={styles.cards}>
                        <div className={styles.card}>
                            <div className={styles.title}>
                                Giriş Tarihi:
                            </div>
                            <div className={styles.data}>
                                {selectiveData.data.startdate.getDate() + "." + (selectiveData.data.startdate.getMonth() + 1) + "." + selectiveData.data.startdate.getFullYear()}
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.title}>
                                Çıkış Tarihi:
                            </div>
                            <div className={styles.data}>
                                {selectiveData.data.enddate.getDate() + "." + (selectiveData.data.enddate.getMonth() + 1) + "." + selectiveData.data.enddate.getFullYear()}
                            </div>
                        </div>
                    </div>
                    <div className={styles.cards}>
                        <div className={styles.card}>
                            <div className={styles.title}>
                                Yetişkin:
                            </div>
                            <div className={styles.data}>
                                {selectiveData.data.adult}
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.title}>
                                Çocuk:
                            </div>
                            <div className={styles.data}>
                                {selectiveData.data.child_status ? selectiveData.data.children : 0}
                            </div>
                        </div>
                    </div>
                    <div className={styles.cards}>
                        <div className={styles.card}>
                            <div className={styles.title}>
                                Oda Tipi:
                            </div>
                            <div className={styles.data}>
                                {selectedRoomDetail[0].title}
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.title}>
                                Manzara:
                            </div>
                            <div className={styles.data}>
                                {selectedViewDetail[0].title}
                            </div>
                        </div>
                    </div>
                </div>
                {
                    withCoupon && <div className={styles.couponWrapper}>
                        <div className={styles.coupon}>
                            <input type="text"
                                name={'couponCode'}
                                onChange={e => { handleCouponChange(e); }}
                                placeholder="Kupon Kodu">
                            </input>
                            <button onClick={() => { submitCouponCode(this.state.couponCode) }}>Kodu Kullan</button>
                        </div>
                    </div>
                }
                <div className={styles.prices}>
                    <div className={styles.price}>
                        <div className={styles.left}>
                            <b>Oda Fiyatı</b>
                        </div>
                        <div className={styles.right}>
                            {selectedRoomDetail[0].price} TL
                        </div>
                    </div>
                    <div className={styles.price}>
                        <div className={styles.left}>
                            <b>Fiyat Etki Oranı</b>
                        </div>
                        <div className={styles.right}>
                            %{selectedViewDetail[0].price_rate}
                        </div>
                    </div>
                    <div className={styles.price}>
                        <div className={styles.left}>
                            <b>Konaklama</b> (5 Gün)
                        </div>
                        <div className={styles.right}>
                            {totalPriceWithoutCalc} TL
                        </div>
                    </div>
                    {
                        couponDetails && couponDetails.applied ?
                            <div className={styles.price}>
                                <div className={styles.left}>
                                    <b>İndirim</b> ({couponDetails.code})
                            </div>
                                <div className={styles.right}>
                                    -{couponDetails.discount} TL
                            </div>
                            </div> : null
                    }
                    <div className={styles.bar}></div>
                    <div className={styles.finalPrice}>
                        <div className={styles.finalPrice__title}>
                            TOPLAM TUTAR
                        </div>
                        <div className={styles.finalPrice__price}>
                            {totalPrice} TL
                        </div>
                    </div>
                </div>
            </div >
        );
    }

}

Info.propTypes = {
    hotels: PropTypes.string,
    hotelDetails: PropTypes.string,
    selectiveData: PropTypes.string,
    selectedView: PropTypes.string,
    selectedRoom: PropTypes.string,
    withCoupon: PropTypes.bool,
    submitCouponCode: PropTypes.func,
    couponDetails: PropTypes.string,
    price: PropTypes.func,
}

export default Info