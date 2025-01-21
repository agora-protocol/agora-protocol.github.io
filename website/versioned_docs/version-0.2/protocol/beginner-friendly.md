---
id: beginner-friendly
title: Beginner-Friendly Specification
---

Agora has two main entities: the sender (Alice) and the receiver (Bob).

### Sending a Message

Alice wants to send a message to Bob. For instance, Alice is a user assistant and Bob is a weather server. For the sake of simplicity, we'll assume that this conversation takes place without any protocol (i.e. using instead plain natural language).

Alice sends a POST to Bob's Agora endpoint containing the following JSON document:

```json
{
  "protocolHash": null,
  "body": "Hello! What's the weather forecast for London on April 25th, 2025?"
}
```

`protocolHash` is the hash of the protocol that Alice is using. Since Alice isn't using a protocol, we set it to `null`.
`body` is the message. Since we're not using any protocol, the mesage is in plain, unstructured natural language.

Bob replies with:

```json
{
  "status": "success",
  "body": "The forecast is windy, with a 13% chance of precipitation"
}
```

`status` can be either `success` or `failure`. `body` is the response. Again, since Alice didn't specify a protocol, the content of `body` is in unstructured natural language.

### Multi-round communication

The previous example assumes that our communication is single-round: one query, one reply. For more complex communications, we add the `multiround` field to the query.

```json
{
  "protocolHash": null,
  "body": "Hello! What's the weather forecast for London on April 25th, 2025?",
  "multiround": true
}
```

In multiround mode, Bob generates a conversation ID and returns it, along with the `conversationExpires` field:

```json
{
  "status": "success",
  "body": "The forecast is windy, with a 13% chance of precipitation",
  "conversationId": "abcdefgh12345",
  "conversationExpires": 1741910401
}
```

where "conversationId" is the ID of the newly-generated conversation and "conversationExpires" is the Unix timestamp describing until when the conversation will be valid.
From that point onwards, Alice doesn't send follow-up requests to the base URL, but rather to `/conversations/abcdefgh12345`. We follow the "one conversation, one protocol" rule: you cannot change protocol throughout a conversation.

Alice's queries are similar to regular queries, but they have the `status` field (to give feedback on Bob's previous reply) instead of `conversationId`:

```json
{
  "status": "success",
  "body": "Thanks! What's the forecast for the 26th instead?"
}
```

Bob replies as usual, but it now adds the new conversation expiration. This can be the same as before, or extended.

```json
{
  "status": "success",
  "body": "Windy as well, but with a 21% chance of precipitation",
  "conversationExpires": 1744585201
}
```

### Protocol Documents

It's time to add our main structure, the Protocol Document!

At its core, a Protocol Document is just a text file. Here's what a protocol document looks like:

```
name: Weather Information protocol
description: A protocol to exchange information on weather
multiround: false
---
The sender sends a JSON with the following fields:
- location (string): location for which the sender queries the weather
- date (string): date in YYYY-MM-DD format

If the query is valid, the receiver replies with a JSON with the following documents:
- weather (string): one of "sunny", "windy", "cloudy", "rainy", or "snowy"
- precipitation (number): probability (between 0 and 100) of precipitation

If the query is not correctly formatted, the receiver replies with the following JSON:
{
    "error": "Invalid format"
}

If the query is for an unsupported location, the receiver replies with the following JSON:
{
    "error": "Unsupported location"
}
```

The first part (up to ---) contains the metadata of the protocol in YAML. The second describes how the communication actually takes place.

We support three metadata items: name, description, multiround. Protocol writers can add further metadata, but these three are mandatory.

When you compute the SHA1 hash of the above protocol document, this is what you get:
[...]

When Alice sends the query following this protocol, she sets the `protocolHash` and `protocolSources` fields:

```json
{
  "protocolHash": []
}
```

Bob's reply uses the same fields as if no protocol was specified.

The same applies for multiround communications.

### Errors

In case of error, Bob sets the `status` field to "error" and adds a new string field, `error` containing the cause of error. In case of errors, `body` must not be used:

```json
{
  "status": "failure",
  "error": "Failed to parse query"
}
```

Note: Agora's error management system is only used in case the used protocol documents (if any) doesn't specify how to manage an error. If the protocol document specifies how to do so, the Agora agent must set "status": "success".

> Future feature: standard error codes for better failure management.

### Supported Protocols

The duty of choosing a protocol falls onto Alice. What happens if Bob doesn't support a protocol? In that case, he rejects it with the error code [].

To simplify Alice's job, Bob can support an endpoint `/wellknown`, which returns a JSON, where the keys are the protocol hash and the values are a list of sources for that specific protocol.

Note: in the context of Agora, a protocol is either supported or not. Partially supported protocols must be treated as unsupported.

### What About Negotiation and Routines?

We haven't talked about two of Agora's core features, i.e. negotiating protocols and implementing them as routines. That's because Agora's specification is actually agnostic to both:

- You can negotiate protocols in natural language or using a specific protocol
- Whether a query is submitted/handled using an LLM, a routine, or something entirely different, Agora's interface is the same

Now that you've understood the rationale of Agora, you can either [jump straight into using it](../getting-started) or [read the formal specification](NA).
