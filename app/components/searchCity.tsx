"use client";
import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

const Search = ({ onSearchChange }: { onSearchChange: any }) => {
	const [search, setSearch] = useState(null);

	const geoApiOptions = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": "a976f62478msh1020dd4e45f74d0p100884jsnbe9348f68f93",
			"X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
		},
	};

	const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

	const loadOptions = (inputValue: string) => {
		return fetch(
			`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
			geoApiOptions
		)
			.then((response) => response.json())
			.then((response) => {
				return {
					options: response.data.map((city: any) => {
						return {
							id: city.id,
							value: `${city.latitude} ${city.longitude}`,
							label: `${city.name}, ${city.country}`,
						};
					}),
				};
			});
	};

	const handleOnChange = (searchData: any) => {
		setSearch(searchData);
		onSearchChange(searchData);
	};

	return (
		<AsyncPaginate
			placeholder="Cari kota..."
			debounceTimeout={600}
			value={search}
			onChange={handleOnChange}
			loadOptions={loadOptions as any}
		/>
	);
};

export default Search;
