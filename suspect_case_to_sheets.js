appendValues({
  spreadsheetId: '1aKvA6JfhiEGc-L_4WGC-PRK0r0JbjP1s3GSOGu2byXw',
  range: 'Suspect and confirmed cases_Butembo!B1:AT68',
  values: [
    ['', // GoogleSheet Destination: Column A
    //dataValue('')(state), // For blank column values we actually only need to specify a null value (see line above)-no need to search for data value in Kobo form
    dataValue('Enter_a_date')(state), // B
    dataValue('Nom_de_l_auditeur')(state), // C
    dataValue('Numero_de_telephone')(state), // D
    dataValue('location')(state), // E
    //dataValue('Health_Zone_Butembo')(state), // F
    //new custom JS function to map either Health Zone Butembo or Beni --> to column F (Health Zone)
    function(state){
          return (dataValue('Health_Zone_Butembo')(state) ? dataValue('Health_Zone_Butembo')(state) : dataValue('Health_Zone_Beni')(state));
        }(state),
    //dataValue('Katwa_hospital')(state), // G
    //custom JS function to map relevant hospital --> to column G (Structure Name)
     function(state){
          var structure='';
          if (dataValue('Butembo_hospital')(state)!==undefined) {
            structure=dataValue('Butembo_hospital')(state);
          } else if (dataValue('Katwa_hospital')(state)!==undefined) {
            structure=dataValue('Katwa_hospital')(state);
          } else if (dataValue('Formation_Musienene')(state)!==undefined) {
            structure=dataValue('Formation_Musienene')(state);
          } else {
            structure=dataValue('Goma_formation')(state);
          }
          return structure;
        }(state),
    dataValue('Aire_de_Sante')(state), // H
    dataValue('Nom_de_responsable')(state), // I
    dataValue('Telephone_de_responsable')(state),  // J
    dataValue('Age_du_patient')(state),  // K
    dataValue('Sexe_du_patient')(state), // L 
    dataValue('Village_d_origine_du_patient')(state),  // M
    dataValue('Adresse_du_patient')(state),  // N
    dataValue('Aire_de_sante_d_origine_du_patient')(state),  // O
    dataValue('Combien_de_personne_enage_que_la_patient')(state),  // P
    dataValue('Avant_de_venir_dans_cet_etabli')(state),  // Q
    dataValue('Si_oui_enumerez_les')(state),  // R
    dataValue('Le_patient_a_ti_t_trie')(state),  // S
    dataValue('Si_non_pourquoi_003')(state),  // T
    dataValue('Le_patient_a_t_il_restiste_au_')(state),  // U
    dataValue('Si_oui_pourquoi')(state),  // V
    dataValue('Quels_etaient_ses_sy_t_admis_a_l_hopital')(state),  // W
    '', // X
    //dataValue('')(state), //For blank column values we actually just need to specify a null value ('')-no need to search for dataValue
    dataValue('Combien_de_personnel_tait_un_EPI_appropri')(state),  // Y
    dataValue('Combien_de_personnel_ait_pas_EPI_appropri')(state),  // Z
    dataValue('Le_patient_a_il_t_isole')(state),  // AA
    dataValue('Si_non_pourquoi_001')(state),  // AB
    dataValue('S_Il_a_t_isole_qu_luation_en_minutes')(state),  // AC
    dataValue('L_enqeteur_a_t_il_determine_qu')(state),  // AD
    dataValue('Patient_transfere_au_CTE')(state),  // AE
    dataValue('Si_non_pourquoi_002')(state),  // AF
    dataValue('Si_il_tait_determin_nutes_heures_jours')(state),  // AG
    dataValue('Statut_du_patient')(state), // AH
    dataValue('Ce_patient_est_un_cas_confirme')(state), // AI
    dataValue('Commentaire')(state), // AJ
    dataValue('La_FOSA_a_t_elle_tait_decontamine')(state), // AK
    dataValue('Score_PCI_pour_la_FOSA_plus_recent')(state), // AL
    dataValue('Commentaire_001')(state), // AM
    dataValue('Le_patient_a_t_il_t_trouv_')(state), // AN
    dataValue('Dernier_score_PCI_Hospitalier')(state), // AO
    dataValue('Dans_quel_pavillon_trouvait_le_patient')(state), // AP
    dataValue('Dernier_score_PCI_pavillon')(state), // AQ  
    dataValue('Combien_d_autres_pat_salle_que_le_patient')(state), // AR
    dataValue('Combien_d_autres_pat_salle_que_le_patient_001')(state), // AS
    dataValue('Ce_pavillon_a_t_i_l_t_decontamine')(state)] // AT
    ]
});
