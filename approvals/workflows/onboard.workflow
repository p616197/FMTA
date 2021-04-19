{
	"contents": {
		"a826033c-7232-4e0b-a347-4d79c2878a9b": {
			"classDefinition": "com.sap.bpm.wfs.Model",
			"id": "onboard",
			"subject": "onboard",
			"name": "onboard",
			"documentation": "Onboarding process",
			"lastIds": "62d7f4ed-4063-4c44-af8b-39050bd44926",
			"events": {
				"11a9b5ee-17c0-4159-9bbf-454dcfdcd5c3": {
					"name": "StartEvent1"
				},
				"2798f4e7-bc42-4fad-a248-159095a2f40a": {
					"name": "EndEvent1"
				}
			},
			"activities": {
				"9fa500ca-0b78-4d81-8453-a52b9a8fec2b": {
					"name": "UserTask4"
				}
			},
			"sequenceFlows": {
				"c6b99f32-5fe6-4ab6-b60a-80fba1b9ae0f": {
					"name": "SequenceFlow1"
				},
				"ff6ab838-410c-456a-8c3e-59ce5653dd89": {
					"name": "SequenceFlow5"
				}
			},
			"diagrams": {
				"42fa7a2d-c526-4a02-b3ba-49b5168ba644": {}
			}
		},
		"11a9b5ee-17c0-4159-9bbf-454dcfdcd5c3": {
			"classDefinition": "com.sap.bpm.wfs.StartEvent",
			"id": "startevent1",
			"name": "StartEvent1",
			"sampleContextRefs": {
				"cd85773f-6774-419b-bfae-eeee4fbcabe3": {}
			}
		},
		"2798f4e7-bc42-4fad-a248-159095a2f40a": {
			"classDefinition": "com.sap.bpm.wfs.EndEvent",
			"id": "endevent1",
			"name": "EndEvent1"
		},
		"9fa500ca-0b78-4d81-8453-a52b9a8fec2b": {
			"classDefinition": "com.sap.bpm.wfs.UserTask",
			"subject": "Manager Approval",
			"priority": "MEDIUM",
			"isHiddenInLogForParticipant": false,
			"userInterface": "sapui5://comnsui5managermanagerUI/com.ns.ui5.manager.managerUI",
			"recipientUsers": "${info.startedBy}",
			"customAttributes": [{
				"id": "FirstName",
				"label": "First Name",
				"type": "string",
				"value": "{context.empData.firstName}"
			}],
			"id": "usertask4",
			"name": "UserTask4"
		},
		"c6b99f32-5fe6-4ab6-b60a-80fba1b9ae0f": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow1",
			"name": "SequenceFlow1",
			"sourceRef": "11a9b5ee-17c0-4159-9bbf-454dcfdcd5c3",
			"targetRef": "9fa500ca-0b78-4d81-8453-a52b9a8fec2b"
		},
		"ff6ab838-410c-456a-8c3e-59ce5653dd89": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow5",
			"name": "SequenceFlow5",
			"sourceRef": "9fa500ca-0b78-4d81-8453-a52b9a8fec2b",
			"targetRef": "2798f4e7-bc42-4fad-a248-159095a2f40a"
		},
		"42fa7a2d-c526-4a02-b3ba-49b5168ba644": {
			"classDefinition": "com.sap.bpm.wfs.ui.Diagram",
			"symbols": {
				"df898b52-91e1-4778-baad-2ad9a261d30e": {},
				"53e54950-7757-4161-82c9-afa7e86cff2c": {},
				"6bb141da-d485-4317-93b8-e17711df4c32": {},
				"e8acd164-4e5f-4ebd-8715-e598a6151f48": {},
				"655241ad-d20d-4806-8deb-c59670c5539b": {}
			}
		},
		"cd85773f-6774-419b-bfae-eeee4fbcabe3": {
			"classDefinition": "com.sap.bpm.wfs.SampleContext",
			"reference": "/sample-data/onboard/empData.json",
			"id": "default-start-context"
		},
		"df898b52-91e1-4778-baad-2ad9a261d30e": {
			"classDefinition": "com.sap.bpm.wfs.ui.StartEventSymbol",
			"x": 12,
			"y": 26,
			"width": 32,
			"height": 32,
			"object": "11a9b5ee-17c0-4159-9bbf-454dcfdcd5c3"
		},
		"53e54950-7757-4161-82c9-afa7e86cff2c": {
			"classDefinition": "com.sap.bpm.wfs.ui.EndEventSymbol",
			"x": 244,
			"y": 24.5,
			"width": 35,
			"height": 35,
			"object": "2798f4e7-bc42-4fad-a248-159095a2f40a"
		},
		"6bb141da-d485-4317-93b8-e17711df4c32": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "28,42 123,42",
			"sourceSymbol": "df898b52-91e1-4778-baad-2ad9a261d30e",
			"targetSymbol": "e8acd164-4e5f-4ebd-8715-e598a6151f48",
			"object": "c6b99f32-5fe6-4ab6-b60a-80fba1b9ae0f"
		},
		"e8acd164-4e5f-4ebd-8715-e598a6151f48": {
			"classDefinition": "com.sap.bpm.wfs.ui.UserTaskSymbol",
			"x": 73,
			"y": 12,
			"width": 100,
			"height": 60,
			"object": "9fa500ca-0b78-4d81-8453-a52b9a8fec2b"
		},
		"655241ad-d20d-4806-8deb-c59670c5539b": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "123,42 261.5,42",
			"sourceSymbol": "e8acd164-4e5f-4ebd-8715-e598a6151f48",
			"targetSymbol": "53e54950-7757-4161-82c9-afa7e86cff2c",
			"object": "ff6ab838-410c-456a-8c3e-59ce5653dd89"
		},
		"62d7f4ed-4063-4c44-af8b-39050bd44926": {
			"classDefinition": "com.sap.bpm.wfs.LastIDs",
			"sequenceflow": 5,
			"startevent": 1,
			"endevent": 1,
			"usertask": 4
		}
	}
}