import { useState } from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Box from "@material-ui/core/Box";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import { Country, City } from "country-state-city";
import ImageUpload from "./ImageUpload";

const App = () => {
  const [username, setUsername] = useState("");
  const [hotels, setHotels] = useState(false);
  const [apartments, setApartments] = useState(false);
  const [hostels, setHostels] = useState(false);
  const [gender, setGender] = useState("female");
  const [countries] = useState(Country.getAllCountries());
  const [cities, setCities] = useState();
  const [selectedCountryISO, setSelectedCountryISO] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    console.log({
      username,
      hotels,
      apartments,
      hostels,
      selectedCountry,
      selectedCountryISO,
      selectedCity,
    });
  };

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangeHotels = (event) => {
    setHotels(event.target.checked);
  };

  const handleChangeApartments = (event) => {
    setApartments(event.target.checked);
  };

  const handleChangeHostels = (event) => {
    setHostels(event.target.checked);
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const handleChangeCountry = (event) => {
    setSelectedCountryISO(event.target.value);
    setSelectedCountry(event.currentTarget.getAttribute("name"));
    setCities(City.getCitiesOfCountry(event.target.value));
  };

  const handleChangeCity = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <Box component="div" m={1}>
        <FormControl>
          <InputLabel htmlFor="my-input">Username</InputLabel>
          <Input value={username} onChange={onChangeUsername} />
          <FormHelperText>Please enter your username.</FormHelperText>
        </FormControl>
      </Box>
      <Box component="div" m={1}>
        <FormControlLabel
          control={
            <Checkbox
              checked={hotels}
              onChange={handleChangeHotels}
              name="hotels"
              color="primary"
            />
          }
          label="Hotels"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={apartments}
              onChange={handleChangeApartments}
              name="apartments"
              color="primary"
            />
          }
          label="Apartments"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={hostels}
              onChange={handleChangeHostels}
              name="hostels"
              color="primary"
            />
          }
          label="Hostels"
        />
      </Box>
      <Box component="div" m={1}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            name="gender"
            value={gender}
            onChange={handleChangeGender}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box component="div" m={1}>
        <FormControl style={{ minWidth: "200px" }}>
          <InputLabel>Country</InputLabel>
          <Select value={selectedCountryISO} onChange={handleChangeCountry}>
            {countries.map((country) => {
              return (
                <MenuItem
                  name={country.name}
                  value={country.isoCode}
                  key={country.isoCode}
                >
                  {country.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      {cities && (
        <Box component="div" m={1}>
          <FormControl style={{ minWidth: "200px" }}>
            <InputLabel>City</InputLabel>
            <Select value={selectedCity} onChange={handleChangeCity}>
              {cities.map((city, index) => {
                return (
                  <MenuItem value={city.name} key={`${city.name}-${index}`}>
                    {city.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      )}
      <Box component="div" m={1}>
        <ImageUpload />
      </Box>
      <Box component="div" m={1}>
        <Button variant="contained" color="primary" type="submit">
          Hello World
        </Button>
      </Box>
    </form>
  );
};

export default App;
