import { Container, CountryInfo, GoBackBtn, Loader, Section } from 'components';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { fetchCountry } from 'service/countryApi';

export const Country = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [countryData, setCountryData] = useState(null);
  const { countryId } = useParams();
    const location = useLocation();
  const backLink = useRef(location.state ?? '/');
  useEffect(() => {
    async function wrapper() {
      try {
        setIsLoading(true);
        const data = await fetchCountry(countryId);
        setCountryData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    wrapper();
  }, [countryId]);
  return (
    <Section>
      {isLoading && <Loader />}
      <Container>
        <GoBackBtn to={backLink.current} />
        {countryData && <CountryInfo data={countryData} />}</Container>
    </Section>
  );
};
