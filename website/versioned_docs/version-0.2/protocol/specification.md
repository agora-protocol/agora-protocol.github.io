---
id: specification
title: Standard
---

Below is the **Working Standard** for the Agora Protocol, structured in a style similar to IETF RFCs. It includes the sections outlined previously, along with normative language (per [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119) and [RFC 8174](https://www.rfc-editor.org/rfc/rfc8174)). While this document follows a typical RFC format, it should be understood as a _draft_.

---

# Agora Protocol for Two-Party JSON Exchanges

### Status of This Memo

This document is intended to be a Proposed Standard. Distribution of this memo is unlimited.

### Copyright Notice

(C) 2025 Samuele Marro.

---

## 1. Abstract

This document specifies the **Agora Protocol**, a lightweight JSON-based framework for two-party exchanges (client and server). The protocol accommodates both single-round (stateless) and multi-round (stateful) conversations, supports optional strict “Protocol Documents” identified by a SHA1 hash, and defines a clear separation of transport-level, Agora-level, and protocol-level errors. The primary goals are **simplicity, extensibility, and clarity**.

---

## 2. Introduction

Systems often need a simple way to exchange structured data with optional support for higher-level conventions (e.g., domain-specific request/response formats). The Agora Protocol provides:

- **A consistent JSON envelope** for client requests and server replies.
- **Optional in-conversation state** (multi-round) via a conversation identifier.
- **Protocol Document references** (via `protocolHash`) to impose additional constraints on message bodies.

This protocol is **agnostic** to underlying application logic, letting users handle domain-specific details within the message body or via Protocol Documents. It **requires HTTPS** to ensure confidentiality but is otherwise minimal in security assumptions.

### 2.1 Scope

- **In Scope**:

  - JSON message format and structure.
  - Error handling conventions (transport-level vs. application-level).
  - Support for protocol documents and conversation state management.

- **Out of Scope**:
  - Authentication, authorization, or key management.
  - Negotiation mechanisms beyond providing a well-known endpoint for protocol discovery.
  - Advanced privacy requirements.

---

## 3. Requirements Language

The key words **“MUST”**, **“MUST NOT”**, **“REQUIRED”**, **“SHALL”**, **“SHALL NOT”**, **“SHOULD”**, **“SHOULD NOT”**, **“RECOMMENDED”**, **“MAY”**, and **“OPTIONAL”** in this document are to be interpreted as described in [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119) and [RFC 8174](https://www.rfc-editor.org/rfc/rfc8174) when, and only when, they appear in all capitals, as shown here.

---

## 4. Terminology

- **Client**: The party initiating a request (formerly “Alice”).
- **Server**: The party receiving the request and generating a response (formerly “Bob”).
- **Conversation**: A multi-round interaction sequence, uniquely identified by a `conversationId`.
- **Protocol Document**: A text file that defines additional, domain-specific request/response structures. It is identified by a unique SHA1 hash.
- **Status**: A JSON field in the response that can be either `"success"` or `"failure"`.

---

## 5. Overview of the Agora Protocol

### 5.1 Transport Requirements

All Agora exchanges **MUST** occur over HTTPS using HTTP `POST`. Implementations **MUST** set the `Content-Type` header to `application/json` for both requests and responses. Additional HTTP headers (e.g., `Accept`, `Accept-Charset`) **MAY** be used but are not mandated by this specification.

### 5.2 Basic Exchange Flow

1. The Client sends an HTTPS `POST` request to the Server’s **base URL** (e.g., `https://api.example.com/agora`), providing a JSON body that **MUST** include at least:

   - `body`: unstructured or protocol-defined content.
   - Optional fields such as `protocolHash`, `multiround`, etc.

2. The Server **MUST** respond with a JSON body that includes:
   - `status`: either `"success"` or `"failure"`.
   - If `status` is `"success"`, it **MAY** include a `body` field for the response and other optional fields.
   - If `status` is `"failure"`, the Server **MUST** include an `error` field describing the failure.

---

## 6. Message Structure

### 6.1 Request Fields

A minimal **Agora request** JSON object **MAY** contain the following fields:

- **`body` (string or object)**:  
  The core of the request. Its format **MAY** be arbitrary if no protocol is used, or constrained by a Protocol Document.

- **`protocolHash` (string or `null`)**:  
  The SHA1 hash identifying a Protocol Document.

  - If absent or `null`, the request uses no formal protocol.

- **`protocolSources` (array of strings or optional format)**:  
  Contains the full text or references to the Protocol Document.

  - **MAY** be omitted if the Server is known to support the specified hash.

- **`multiround` (boolean)**:  
  If `true`, requests initiation of a multi-round conversation.

- **Additional Fields**:  
  Extra fields **MAY** be present and **MUST** be ignored by the Server unless explicitly recognized.

### 6.2 Response Fields

A minimal **Agora response** JSON object **MAY** contain the following fields:

- **`status` (string)**:  
  Either `"success"` or `"failure"`.

- **`body` (string or object)**:  
  Present if and only if `status` is `"success"`. The Server’s main response content.

- **`error` (string)**:  
  Present if and only if `status` is `"failure"`. Describes an Agora-level error condition.

- **`conversationId` (string)**:  
  Present if initiating or continuing a multi-round conversation.

- **`conversationExpires` (integer)**:  
  A Unix timestamp indicating the conversation’s expiration. Present only if multi-round mode is in effect.

- **Additional Fields**:  
  **MAY** appear for extended metadata or logging but are not standardized.

### 6.3 Example Message Exchange

#### 6.3.1 Single-Round Example

**Request** (Client -> Server, no protocol, single-round):

```json
{
  "protocolHash": null,
  "body": "Hello! What is the weather tomorrow in London?"
}
```

**Response** (Server -> Client):

```json
{
  "status": "success",
  "body": "It will be cloudy with a 30% chance of precipitation."
}
```

#### 6.3.2 Multi-Round Example

**Request** (Client -> Server, multi-round initiation):

```json
{
  "protocolHash": null,
  "body": "Hello! I'd like to ask multiple questions.",
  "multiround": true
}
```

**Response** (Server -> Client):

```json
{
  "status": "success",
  "body": "Multi-round conversation initiated.",
  "conversationId": "abc123xyz",
  "conversationExpires": 1741910401
}
```

---

## 7. Multi-Round Conversations

### 7.1 Conversation Initialization

- A Client **MUST** include `"multiround": true` to request multi-round mode.
- If the Server approves, it **MUST** generate a unique `conversationId` and **MUST** return a `conversationExpires` timestamp.

### 7.2 Follow-Up Requests

Once a multi-round conversation is established, the Client **MUST** `POST` subsequent requests to:

```
{baseURL}/conversations/{conversationId}
```

Follow-up requests **MUST NOT** include the `protocolHash` if it was set in the original request. Attempting to change the protocol mid-conversation is invalid and **MUST** be treated as a malformed request by the Server.

### 7.3 Conversation Expiration

- The Server **MAY** set any future timestamp for `conversationExpires`.
- After reaching `conversationExpires`, the Server **SHOULD** return `status: "failure"` and `error: "Conversation expired"` (or similar) if any further requests for that `conversationId` arrive.
- The Server **MUST NOT** allow usage of an expired conversationId.

---

## 8. Protocol Documents and Hashing

### 8.1 Protocol Document Format

A **Protocol Document** is a text file with two parts, separated by a line containing `---`:

1. **YAML Metadata** (top section), containing at least:

   - `name` (string)
   - `description` (string)
   - `multiround` (boolean)

2. **Specification** (freeform text), describing how requests and responses _MUST_ or _SHOULD_ be structured at the application level.

### 8.2 SHA1 Hash Identification

- Implementations **MUST** use the entire Protocol Document text (including metadata, the `---` separator, and the specification) as input to the SHA1 function.
- The resulting 40-character hexadecimal digest **MUST** serve as the unique protocol identifier in `protocolHash`.

### 8.3 Usage of Protocol Hash and Sources

- When a Client sends `protocolHash`, the Server **MUST** verify that it supports that protocol.
- If the Server does not support it, it **MUST** return:
  ```json
  {
    "status": "failure",
    "error": "Unsupported protocol"
  }
  ```
  accompanied by HTTP status code 200 (denoting a valid Agora message, but a protocol-level rejection at the Agora layer).
- `protocolSources` **MAY** be included in the request to provide the document text, but the Server **MAY** ignore it if it already has the document or is not interested.

---

## 9. Well-Known Endpoint

A Server **MAY** implement:

```
GET {baseURL}/wellknown
```

The Server **MUST** return a JSON object where each key is a supported `protocolHash`, and the value is a (non-empty) list of Protocol Document sources. Example:

```json
{
  "1234abcd...": [
    "name: Example Protocol\n...",
    "---\nThis is an example specification..."
  ],
  "5678efgh...": [
    "name: Another Protocol\n...",
    "---\nSome specification text..."
  ]
}
```

If a protocol is “partially supported,” from Agora’s perspective it is not supported, and **MUST NOT** appear in the response.

---

## 10. Error Handling

### 10.1 Transport-Level Errors

Transport-level errors **MUST** be indicated using appropriate HTTP status codes. For instance:

- `400 Bad Request` for malformed JSON or invalid fields at the HTTP layer.
- `404 Not Found` for unknown endpoints or conversation IDs.
- `500 Internal Server Error` for server-side faults.

### 10.2 Agora-Level Errors

When the request is well-formed HTTP and JSON but **cannot** be processed due to an Agora rule (e.g., unsupported protocol, expired conversation), the Server **MUST** respond with HTTP 200 and JSON:

```json
{
  "status": "failure",
  "error": "<Short error message>"
}
```

### 10.3 Protocol-Level Errors

If the request is valid at the Agora level but violates the **Protocol Document**’s rules (e.g., missing required fields, unsupported domain-specific parameter):

- The Server **MUST** return `status: "success"` (Agora layer is fine).
- The Server **MUST** describe the error **inside** `body`, or in whatever format the Protocol Document prescribes.
- Example:
  ```json
  {
    "status": "success",
    "body": {
      "error": "Invalid date format"
    }
  }
  ```

---

## 11. Security Considerations

1. **HTTPS**:

   - This specification **REQUIRES** TLS/HTTPS transport. Clients and servers **MUST NOT** use plain HTTP for production use.

2. **Conversation ID Security**:

   - Servers **SHOULD** generate random, hard-to-guess `conversationId` values to mitigate session hijacking.

3. **Privacy**:

   - The protocol does not place constraints on the data contained in `body`. Implementers **SHOULD** consider the sensitivity of data exchanged and handle logging or storage accordingly.

4. **Authentication**:
   - Out of scope. Systems **MAY** layer on top of the Agora Protocol with tokens, OAuth, etc.

---

## 12. Implementation Notes and Examples

### 12.1 Single-Round Implementation Snippet

- **Client**: (Pseudo-code)

  ```python
  import requests

  payload = {
    "protocolHash": None,
    "body": "What is the temperature?"
  }
  r = requests.post("https://api.example.com/agora", json=payload)
  print(r.json())
  ```

- **Server**: (Pseudo-code)

  ```python
  from flask import Flask, request, jsonify

  app = Flask(__name__)

  @app.route("/agora", methods=["POST"])
  def handle_single_round():
      data = request.json
      # Basic validation...
      if "body" not in data:
          return jsonify({
              "status": "failure",
              "error": "Missing field 'body'"
          }), 200

      # Return a success with some response
      return jsonify({
          "status": "success",
          "body": "It's 15°C with light rain."
      }), 200
  ```

### 12.2 Multi-Round Conversation Snippet

- **Client**:

  1. Initiate conversation (`multiround: true`).
  2. Parse `conversationId` and `conversationExpires`.
  3. Send follow-ups to `/conversations/{conversationId}` until expiration.

- **Server**:
  1. Generate random `conversationId`.
  2. Store minimal conversation state (if needed).
  3. Reject requests if the conversation is expired or unknown.

---

## 13. IANA Considerations

This specification does not create or modify any existing IANA registries.  
If future versions wish to register a well-known URI (e.g., `.well-known/agora`), that would be addressed in an update.

---

## 14. References

### 14.1 Normative References

- [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119), _Key words for use in RFCs to Indicate Requirement Levels_
- [RFC 8174](https://www.rfc-editor.org/rfc/rfc8174), _Ambiguity of Uppercase vs Lowercase in RFC 2119 Key Words_
- [RFC 8259](https://www.rfc-editor.org/rfc/rfc8259), _The JavaScript Object Notation (JSON) Data Interchange Format_

### 14.2 Informative References

- [RFC 7230](https://www.rfc-editor.org/rfc/rfc7230), _Hypertext Transfer Protocol (HTTP/1.1): Message Syntax and Routing_
- [RFC 7231](https://www.rfc-editor.org/rfc/rfc7231), _HTTP/1.1 Semantics and Content_

---

## 15. Acknowledgments

The authors wish to thank all early implementers and reviewers who contributed feedback to the design of this protocol.

---

## Notes on Conformance

Implementers **MUST** ensure their systems strictly follow the requirements on `status` fields, conversation lifecycles, and error handling. Optional features (like the well-known endpoint) remain **RECOMMENDED** but not mandatory.
