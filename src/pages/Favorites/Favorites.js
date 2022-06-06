import React, {useState, useEffect} from 'react';
import Sidebar from '../../components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrencyAsync } from '../../redux/action/CurrencyAction';
import Select from 'react-select';
import heartRed from '../../assets/images/VectorRed.png';
import '../../App.css';

const Favorites = () => {
    const [selectedOption, setSelectedOption] = useState({});
    const [multiplier, setMultiplier] = useState({rate: 1, id: 1});
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(fetchCurrencyAsync());
    }, [dispatch]);
  
    const { currencies } = useSelector((state) => state.currencyReducer);
    const { favorites } = useSelector((state) => state.favReducer)
  
    const handleChange = (selectedOption) => {
      setSelectedOption(selectedOption);
  
      const convertObj = currencies.data.net_conversions.find(
        (data) =>
          data.currency_id === 1 &&
          data.buying_currency_id === selectedOption.value
      );
  
      setMultiplier({
        rate: Number(convertObj.net_rate),
        id: convertObj.buying_currency_id,
      });
    };
  
    const optionGroup = [
      {
        options: currencies?.data?.currencies?.map((data) => {
          return {
            label: (
              <div style={{ fontSize: '14px', lineHeight: '17px' }}>
                <img
                  src={data.flag_url}
                  alt="flag"
                  height="10px"
                  width="10px"
                  style={{ marginRight: '10px' }}
                />
                {data.name}
              </div>
            ),
            value: data.id,
          };
        }),
      },
    ];
  
    return (
      <div className="main">
        <div>
          <Sidebar favStyle={true} />
        </div>
        <div className="page-content">
          <h1>Favorites</h1>
          <main>
            {favorites !== null ? favorites.map(
              (developer) => (
                <div className="card" key={developer._source.cust_id}>
                  <img
                    src={developer._source.service_photo}
                    alt="profile pic"
                    className="backImage"
                  />
                  <div className="card-info">
                    <div className="profile-info">
                      <h4>{developer._source.display_name}</h4>
                      <span>
                        {
                          currencies?.data?.currencies?.find(
                            (data) => data.id === multiplier.id
                          ).short
                        }
                        {(
                          developer._source.starting_from * multiplier.rate
                        ).toFixed(2)}
                      </span>
                    </div>
                    <span>Hire</span>
                  </div>
                  <img
                    src={developer._source.avatar}
                    alt="avatar"
                    className="avatar"
                  />
                  <div className="favorite fav-color">
                    <img src={heartRed} alt="favorite" />
                  </div>
                </div>
              )
            ) : (
              <div style={{margin: '0 auto'}}>
                  <h1>No favorite developer yet</h1>
              </div>
            )}
          </main>
          <footer className="footer">
            <span>&copy; 2022 DevHire</span>
            <Select
              className="currency"
              value={selectedOption}
              options={optionGroup}
              onChange={handleChange}
            />
          </footer>
        </div>
      </div>
    );
}

export default Favorites