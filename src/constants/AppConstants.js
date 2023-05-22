export const AGE = Array.from(Array(76), (_, index) => index + 35);
export const RACE = [
	{ value: 6, label: "White" },
	{ value: 3, label: "NativeAmerican" },
	{ value: 0, label: "Asian" },
	{ value: 1, label: "Black" },
	{ value: 2, label: "Hispanic" },
	{ value: 4, label: "PacificIslander" },
	{ value: 5, label: "Unknown" },
];

export const SEX = [
	{ value: 1, label: "Male" },
	{ value: 0, label: "Female" },
];

export const TEMP = Array.from(Array(20), (_, index) => index + 85);

export const DIS_CODE = [
	{ value: 0, label: "Certain conditions originating in the perinatal period" },
	{ value: 1, label: "Certain infections and parasitic diseases" },
	{
		value: 2,
		label:
			"Congenital malformations, deformations and chromosomal abnormalities",
	},
	{
		value: 3,
		label:
			"Diseases of the blood and blood-forming organs and certain disorders involving the immune mechanism",
	},
	{ value: 4, label: "Diseases of the circulatory system" },
	{ value: 5, label: "Diseases of the digestive system" },
	{ value: 6, label: "Diseases of the ear and mastoid process" },
	{ value: 7, label: "Diseases of the genitourinary system" },
	{
		value: 8,
		label: "Diseases of the musculoskeletal system and connective tissue",
	},
	{ value: 9, label: "Diseases of the nervous system" },
	{ value: 10, label: "Diseases of the respiratory system" },
	{ value: 11, label: "Diseases of the skin and subcutaneous tissue" },
	{ value: 12, label: "Endocrine, nutritional and metabolic diseases" },
	{ value: 13, label: "External causes of morbidity" },
	{
		value: 14,
		label: "Factors influencing health status and contact with health services",
	},
	{
		value: 15,
		label:
			"Injury, poisoning, and certain other consequences of external causes",
	},
	{ value: 16, label: "Mental, Behavioral and Neurodevelopmental disorders" },
	{ value: 17, label: "Neoplasms" },
	{ value: 18, label: "Other" },
];
