import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDevAsync } from '../../redux/action/DevListAction';
import { fetchCurrencyAsync } from '../../redux/action/CurrencyAction';
import { postFavoriteAsync } from '../../redux/action/FavoriteAction';
import Select from 'react-select';
import heart from '../../assets/images/Vector.png';
import heartRed from '../../assets/images/VectorRed.png';
import '../../App.css';

const Home = () => {
  const [selectedOption, setSelectedOption] = useState({});
  const [multiplier, setMultiplier] = useState({rate: 1, id: 1});
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDevAsync());
    dispatch(fetchCurrencyAsync());
  }, [dispatch]);

  const { developers } = useSelector((state) => state.devReducer);
  const { currencies } = useSelector((state) => state.currencyReducer);

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

  const addFavorite = (developer, devId) => {
    setIsFavorite(true);
    // developers?.data?.service_search_results?.hits
    setFavorites([...favorites, developer]);
  }

  useEffect(() => {
    dispatch(postFavoriteAsync(favorites));
  }, [dispatch, favorites])


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
        <Sidebar homeStyle={true} />
      </div>
      <div className="page-content">
        <h1>Hire Top Developers</h1>
        <main>
          {developers?.data?.service_search_results?.hits?.map(
            (developer) => (
              <div className="card" key={developer._id}>
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
                <button className={isFavorite ? 'favorite fav-color' : 'favorite'} onClick={() => addFavorite(developer, developer._id )}>
                  <img src={isFavorite ? heartRed : heart} alt="favorite" />
                </button>     
              </div>
            )
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
};

export default Home;
