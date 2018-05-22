import React, { PureComponent } from 'react'

//Styling
  import './packageSendForm.css'

//Logic
  import {compare} from '../../logic/logic.js'

//Data
  import {afleverPlekken, afleverData} from '../../data/data.js'

//MaterialUI
  import Paper from '@material-ui/core/Paper';
  import TextField from '@material-ui/core/TextField';
  import MaskedInput from 'react-text-mask';
  import Button from '@material-ui/core/Button';
  import FormControl from '@material-ui/core/FormControl';
  import FormLabel from '@material-ui/core/FormLabel';
  import RadioButtonGroup from '@material-ui/core/RadioGroup';
  import FormControlLabel from '@material-ui/core/FormControlLabel';
  import Radio from '@material-ui/core/Radio';
  import FormHelperText from '@material-ui/core/FormHelperText';
  import Checkbox from '@material-ui/core/Checkbox';
  import Select from '@material-ui/core/Select';
  import Dialog from '@material-ui/core/Dialog';
  import DialogActions from '@material-ui/core/DialogActions';
  import DialogContent from '@material-ui/core/DialogContent';
  import DialogContentText from '@material-ui/core/DialogContentText';
  import DialogTitle from '@material-ui/core/DialogTitle';
  import Slide from '@material-ui/core/Slide';

//Icons
  import Send from '@material-ui/icons/Send';

//Functions
  function AfmetingenMask(props) {
    const { inputRef, ...other } = props;

    return (
      <MaskedInput
        {...other}
        ref={inputRef}
        mask={[/\d/, /\d/, 'x', /\d/, /\d/, 'x', /\d/, /\d/]}
        placeholderChar={'\u2000'}
        keepCharPositions={true}
      />
    );
  }

  function PostcodeMask(props) {
    const { inputRef, ...other } = props;

    return (
      <MaskedInput
        {...other}
        ref={inputRef}
        mask={[/\d/, /\d/, /\d/, /\d/, ' ', /[a-zA-Z]/, /[a-zA-Z]/]}
        placeholderChar={'\u2000'}
        keepCharPositions={true}
      />
    );
  }

  function Transition(props) {
    return <Slide direction="up" {...props} />;
  }


class PackageSendForm extends PureComponent {
  state = {
    pakketten: [1],
    afleverPlek: '',
    postcode: '',
    complete: false,
    dialog: false,
    termsOfService: false,
  }

  handleSubmit = () => {
    console.log('working');
  }

  handleChange = (event) => {
    event.preventDefault()
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  handleUpClick = () => {
    if(this.state.pakketten.length === 0){
      this.setState({
        pakketten: [1]
      })
    }
    else{
      let p = this.state.pakketten
      p.push(p[p.length-1]+1)
      this.setState({
        pakketten: p
      })
    }
    this.forceUpdate()
  }

  handleRemoveClick = (packageNumber) => {
    const p = this.state.pakketten
    const index = p.indexOf(packageNumber);
    if (index > -1) {
      p.splice(index, 1);
    }
    this.setState({
      pakketten: p,
      [packageNumber]: '',
    })
    this.forceUpdate()
  }

  handleDialogOpen = () => {
    this.setState({
      dialog: true
    });
  };

  handleDialogClose = () => {
    this.setState({
      dialog: false
    });
  };

  handleAgree = () => {
    this.setState({
      dialog: false,
      termsOfService: true,
    })
  }

  render() {
    console.log(this.state.pakketten);
    return (
      <div className='page'>
        {}
        <h1 className='page-title'>aanmeldingsformulier pakketten</h1>
        <Paper className='text-field-container'>
          <div className='text-container'>
            <form onsubmit={this.handleSubmit} id='form'>
            <TextField
              name='voornaam'
              className='text-input'
              label="Voornaam"
              fullWidth={true}
              value={this.state.voornaam || ''}
              onChange={this.handleChange}
              margin="normal"
              required
            />
            <TextField
              name='achternaam'
              className='text-input'
              label="Achternaam"
              fullWidth={true}
              value={this.state.achternaam|| ''}
              onChange={this.handleChange}
              margin="normal"
              required
            />
            <div className='street-input-container'>
              <TextField
                name='straat'
                className='text-input'
                label="Straat"
                fullWidth={true}
                value={this.state.straat || ''}
                onChange={this.handleChange}
                margin="normal"
                required
              />
            </div>
            <div className='number-input-container'>
              <TextField
                name='huisnummer'
                type='number'
                className='text-input'
                label="Nummer"
                fullWidth={true}
                value={this.state.huisnummer || ''}
                onChange={this.handleChange}
                margin="normal"
                required
              />
            </div>
            <TextField
              name='postcode'
              className='text-input'
              label="Postcode"
              fullWidth={true}
              value={this.state.postcode.toUpperCase() || ''}
              onChange={this.handleChange}
              margin="normal"
              InputProps={{
                inputComponent: PostcodeMask,
              }}
              required
            />
            <TextField
              name='woonplaats'
              className='text-input'
              label="Woonplaats"
              fullWidth={true}
              value={this.state.woonplaats || ''}
              onChange={this.handleChange}
              margin="normal"
              required
            />
            <TextField
              name='telefoonnummer'
              type='number'
              className='text-input'
              label="Telefoonnummer"
              fullWidth={true}
              value={this.state.telefoonnummer || ''}
              onChange={this.handleChange}
              margin="normal"
              required
            />
            <TextField
              name='email'
              className='text-input'
              label="E-mail"
              fullWidth={true}
              value={this.state.email || ''}
              onChange={this.handleChange}
              margin="normal"
              required
            />
            </form>
          </div>
        </Paper>
        <Paper
          className='packages-container'>
          <div className='packages-title-container'>
            <p className='packages-title'>Aantal pakketten:</p>
            <div className='packages-amount-container'>
              <p className='packages-amount'>{this.state.pakketten.length}</p>
            </div>
            <Button className='packages-amount-button' variant="flat" size='small' onClick={this.handleUpClick}>+1</Button>
          </div>
          <div className='packages-details-container'>
            {this.state.pakketten.map((packageNumber) => {
              return(
                <div className='packages-details'>
                  <p>Pakket {packageNumber}:</p>
                  <div className='package-details-text-container'>
                    <TextField
                      name={`${packageNumber}`}
                      className='package-details-text-input'
                      label="Afmeting"
                      fullWidth={true}
                      value={this.state[packageNumber] || ''}
                      onChange={this.handleChange}
                      margin="dense"
                      InputProps={{
                        inputComponent: AfmetingenMask,
                      }}
                      required
                    />
                    <FormHelperText>LengtexBreedtexHoogte</FormHelperText>
                  </div>
                  <div className='package-details-measurement-units-container'>
                    <FormControl className='package-details-measurement-units'>
                      <Select
                        value={this.state.unit || 'cm'}
                        name='unit'
                        onChange={this.handleChange}
                        inputProps={{
                          id: 'unit',
                        }}
                        native
                      >
                        <option value='mm'>mm</option>
                        <option value='cm'>cm</option>
                        <option value='dm'>dm</option>
                        <option value='m'>m</option>
                      </Select>
                    </FormControl>
                  </div>
                  <Button className='package-details-button' variant="flat" size='small' onClick={_ => this.handleRemoveClick(packageNumber)}>Verwijder</Button>
                </div>
              )
            })}
          </div>
        </Paper>
        {this.state.postcode &&
          <Paper
            className='radiobutton-container'
          >
            <div className='form-radiobuttons'>
              <FormControl
              component='op'
              className='form-controller'
              margin='normal'
              required>
                <div className='form-title-container'>
                  <FormLabel className="fixed-label">
                    Wij willen de pakketten afleveren in:
                  </FormLabel>
                </div>
                <div className='form-radio-container'>
                  <RadioButtonGroup
                    aria-label="afleverPlek"
                    className="form-radio-group"
                    name="afleverPlek"
                    value={this.state.afleverPlek}
                    onChange={this.handleChange}
                  >
                    {afleverPlekken.sort(compare).map((plek) => {
                      return(
                        <FormControlLabel
                          value={plek.name}
                          key={plek.postcode}
                          className='form-radiobutton'
                          label={plek.name}
                          control={<Radio />}
                          labelStyle={{
                            textAlign: 'left',
                            marginLeft: '5px',
                          }}
                        />
                      )
                    })}
                  </RadioButtonGroup>
                </div>
              </FormControl>
            </div>
          </Paper>
        }
        <div className='submit-container'>
          <div className='double-lable-checkbox'>
            <p className='checkbox-label'>Meesturen met de container van *</p>
            <FormControlLabel
              className='form-submit-2-checkbox'
              control={
                <Checkbox/>
              }
              label={afleverData[afleverData.length-1]}
             />
           </div>
            <FormControlLabel
              className='form-submit-checkbox'
              control={
                <Checkbox/>
              }
              label='Stuur mij een kopie'
             />
           <Button
             className='form-submit-button'
             variant="raised"
             color="primary"
             size="large"
             onClick={this.handleDialogOpen}>
               verstuur
               <Send className='button-icon'/>
           </Button>
           {this.state.termsOfService &&
             <FormControlLabel
               className='form-submit-checkbox'
               control={
                 <Checkbox checked={this.state.termsOfService}/>
               }
               label='Wij gaan akkoord met de algemene voorwaarden. *'
              />
           }
        </div>
        <Dialog
          open={this.state.dialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
        >
          <DialogTitle>
            {"Algemene voorwaarden"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
            <h4>Voor alle verzendingen geldt:</h4>
            <ol>
              <span style={{color: 'red'}}>
              <li>
                De afzender dient alles goed dichtgeplakt te verpakken in
                stevige dozen en te voorzien van de volgende informatie:
                <ol type='a'>
                  <li>naam en telefoonnummer van de ontvanger</li>
                  <li>naam van de afzender</li>
                </ol>
              </li>
              </span>
              <li>
                Items die niet in een doos passen: stevig verpakken en voorzien
                van bovengenoemde informatie (zie punt 1a en 1b).
              </li>
              <li>
                Fietsen kunt u gewoon aanmelden via het aanmeldingsformulier.
                Denkt u eraan om bij aanlevering de trappers te demonteren
                (los in een zak aan de fiets vastmaken) en het stuur een
                kwartslag te draaien. Bovengenoemde informatie (zie punt 1a en 1b)
                dient bevestigd te worden aan de fiets. Voor een fiets rekenen
                wij 0,25m3.
              </li>
              <li>
                Er mag <span style={{fontWeight: 'bold'}}>geen alcohol en
                geregistreerde medicijnen</span> verstuurd worden.
                De boetes zijn zeer fors en moeten we helaas verhalen op de
                verzender van deze spullen.
              </li>
              <li>
                Verzendingen in de regentijd dienen regenbestendig te worden verpakt.
              </li>
              <li>
                Plastic is verboden in Gambia en de douane in de haven is hier
                streng op, dus geen plastic meer om de dozen. Plakband mag
                uiteraard wel maar liever <span style={{fontWeight: 'bold'}}>niet
                over de handvaten</span> plakken. Dit is lastig met het optillen
                van de dozen.
              </li>
              <li>Verzendingen moeten eerst aangemeld worden middels het aanmeldingsformulier voor ze kunnen worden afgegeven bij een afgiftepunt naar keuze.</li>
              <li>De prijs van het versturen is afhankelijk van de afmeting van een bananendoos van 50x40x25 cm. Een andere afmeting is terug te zien in de prijs. Grotere dozen nemen meer ruimte in de container in en worden naar evenredigheid berekend. Kleinere dozen nemen minder ruimte in en zijn goedkoper.</li>
              <li>De stichting pakt de container naar eigen inzicht in.</li>
              <li>De stichting behoudt zich het recht voor, indien daarvoor gerichte aanleiding is, om de inhoud van de pakketten te controleren.</li>
              <li>De toegezonden factuur dient binnen 5 dagen na dagtekening op de bankrekening van Stichting Goods for Gambia te zijn bijgeschreven. Alleen betaalde verzendingen worden in de container geplaatst.</li>
              <li>Onze contactpersonen in Gambia nemen telefonisch contact op met de geadresseerden om een afspraak te maken om de goederen op te halen.</li>
              <li>Wij beschikken over een eigen (afgesloten) terrein in Gambia; echter stellen wij het op prijs indien de ontvangers de goederen zo spoedig mogelijk afhalen.</li>
              <li>De afzender dient de ontvanger te informeren over de identificatieplicht en het aftekenen voor ontvangst bij het verlaten van het terrein. Zonder identificatie kunnen wij de goederen niet meegeven. (Identificatie kan o.a. dmv id-card / working card / telefoonnummer.)</li>
              <li>De ontvangers kunnen met maximaal 2 personen de goederen afhalen ivm de drukte in het warehouse.</li>
              <li>Indien de ontvanger de goederen (zonder bericht) na 1 maand nog niet heeft afgehaald, behoudt Stichting Goods for Gambia zicht het recht voor deze goederen te schenken aan een goed doel.</li>
              <li>Indien u uw goederen wilt verzekeren dient u hier zelf zorg voor te dragen.</li>
              <li>Verzending is op eigen risico Stichting Goods for Gambia is niet verantwoordelijk voor eventuele beschadigingen cq verlies.</li>
              <li>Door het verzenden van de goederen geeft u aan van bovenstaande kennis te hebben genomen en hiermee akkoord te gaan.</li>
            </ol>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleAgree} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default PackageSendForm;
