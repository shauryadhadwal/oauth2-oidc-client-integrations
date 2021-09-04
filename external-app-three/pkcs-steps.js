// Initiate the PKCE Auth Code flow when the link is clicked
document.getElementById("start").addEventListener("click", async function(e){
  e.preventDefault();
  
  // Create and store a random "state" value
  var state = generateRandomString();
  localStorage.setItem("pkce_state", state);

  // Create and store a new PKCE code_verifier (the plaintext random secret)
  var code_verifier = generateRandomString();
  localStorage.setItem("pkce_code_verifier", code_verifier);

  // Hash and base64-urlencode the secret to use as the challenge
  var code_challenge = await pkceChallengeFromVerifier(code_verifier);

  // Build the authorization URL
  var url = config.authorization_endpoint 
      + "?response_type=code"
      + "&client_id="+encodeURIComponent(config.client_id)
      + "&state="+encodeURIComponent(state)
      + "&scope="+encodeURIComponent(config.requested_scopes)
      + "&redirect_uri="+encodeURIComponent(config.redirect_uri)
      + "&code_challenge="+encodeURIComponent(code_challenge)
      + "&code_challenge_method=S256"
      ;

  // Redirect to the authorization server
  window.location = url;
});
