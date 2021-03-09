import React, { Component } from 'react'
import styles from './viewselective.module.scss'
import PropTypes from 'prop-types'

class ViewSelective extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {
            cacheSelectedView,
            hotelDetails,
            selectedHotel,
            selectedView,
        } = this.props

        let views = [];

        const View = (checked, view) => {

            return (<div className={styles.view}>
                <input
                    type="radio"
                    id={view.id}
                    name={"view"}
                    value={view.id}
                    className={styles.viewRadio}
                    onChange={(e) => { console.log("clicked this ", e.target.value); selectedView(e.target.value) }}
                    checked={checked}
                />
                <label for={view.id} className={styles.viewLabel}>
                    <div className={styles.innerDetails}>
                        <div className={styles.innerDetails__title}>
                            {view.title}
                        </div>
                        <img src={view.photo} className={styles.viewImg} />
                        <div className={styles.innerDetails__desc}>
                            <div className={styles.details}>
                                Fiyata Etki Oranı
                            </div>
                            <div className={styles.price}>
                                +{view.price_rate}%
                            </div>
                        </div>
                    </div>
                </label>
            </div>);
        }

        console.log("states ", cacheSelectedView);

        return (
            <div className={styles.viewselective}>
                <div className={styles.title}>
                    Manzara Seçimi
                </div>
                <div className={styles.bar}></div>
                <div className={styles.viewtype}>
                    {hotelDetails.map(function (hotel, index) {
                        if (hotel.id == selectedHotel) {
                            hotel.room_scenic.map(function (view, index) {
                                //console.log("room ", room);
                                if (cacheSelectedView) {
                                    if (view.id == cacheSelectedView) {
                                        views.push(View(true, view));
                                    } else {
                                        views.push(View(false, view));
                                    }
                                } else {
                                    views.push(View(false, view));
                                }
                            })
                        }
                    })}

                    {views}

                </div>
            </div>
        );
    }

}

ViewSelective.propTypes = {
    cacheSelectedView: PropTypes.string,
    hotelDetails: PropTypes.string,
    selectedHotel: PropTypes.number,
    selectedView: PropTypes.string,
}

export default ViewSelective